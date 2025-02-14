import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import DraggableBase from "./DraggableBase";
import { DraggableProps } from "../types/types";
// import SimplexNoise from "simplex-noise";
import * as THREE from "three";


class PerlinNoise {
    private permutation: number[];
    private p: number[];

    constructor() {
        this.permutation = Array.from({ length: 256 }, () => Math.floor(Math.random() * 256));
        this.p = new Array(512);
        for (let i = 0; i < 512; i++) {
            this.p[i] = this.permutation[i % 256];
        }
    }

    private fade(t: number): number {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }

    private lerp(t: number, a: number, b: number): number {
        return a + t * (b - a);
    }

    private grad(hash: number, x: number, y: number, z: number): number {
        const h = hash & 15;
        const u = h < 8 ? x : y;
        const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
        return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
    }

    public noise3D(x: number, y: number, z: number): number {
        const X = Math.floor(x) & 255;
        const Y = Math.floor(y) & 255;
        const Z = Math.floor(z) & 255;

        x -= Math.floor(x);
        y -= Math.floor(y);
        z -= Math.floor(z);

        const u = this.fade(x);
        const v = this.fade(y);
        const w = this.fade(z);

        const A = this.p[X] + Y, AA = this.p[A] + Z, AB = this.p[A + 1] + Z;
        const B = this.p[X + 1] + Y, BA = this.p[B] + Z, BB = this.p[B + 1] + Z;

        return this.lerp(w,
            this.lerp(v,
                this.lerp(u, this.grad(this.p[AA], x, y, z),
                    this.grad(this.p[BA], x - 1, y, z)),
                this.lerp(u, this.grad(this.p[AB], x, y - 1, z),
                    this.grad(this.p[BB], x - 1, y - 1, z))),
            this.lerp(v,
                this.lerp(u, this.grad(this.p[AA + 1], x, y, z - 1),
                    this.grad(this.p[BA + 1], x - 1, y, z - 1)),
                this.lerp(u, this.grad(this.p[AB + 1], x, y - 1, z - 1),
                    this.grad(this.p[BB + 1], x - 1, y - 1, z - 1)))
        );
    }
}

// export default PerlinNoise;

export const SlowVirus: React.FC<DraggableProps> = (props) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const noise = new PerlinNoise(); // Perlinノイズの代わりにSimplexNoiseを使用
    const k = 3; // ノイズのスケール倍率
    const noiseStrength = 0.5 // ノイズの強さ
    const baseNoiseStrength = 0.5; // 基本のノイズの強さ

    useFrame(() => {
        if (!meshRef.current) return;

        const geometry = meshRef.current.geometry as THREE.BufferGeometry;
        const positions = geometry.attributes.position.array;
        const uvs = geometry.attributes.uv.array;
        const index = geometry.index ? geometry.index.array : null; // 面のインデックス
        const colors: number[] = []; // 色の配列を作成

        // 時間のオフセットを適用 (動的な変形)
        const time = performance.now() * 0.01;

        // 爆発エフェクト: 時間とともに大きく変形
        const explosionFactor = Math.abs(Math.sin(time * 0.2)) * baseNoiseStrength;

        if (index) {
            for (let i = 0; i < index.length; i += 3) {
                const posIndex = index[i] * 3;
                let x = positions[posIndex];
                let y = positions[posIndex + 1];
                let z = positions[posIndex + 2];

                // 頂点の正規化
                const length = Math.sqrt(x * x + y * y + z * z);
                const normX = x / length;
                const normY = y / length;
                const normZ = z / length;

                // Perlin ノイズ適用 (時間オフセット)
                const noiseValue = noise.noise3D(normX * k, normY * k, normZ * k + time);

                // **位置を直接更新**
                x += normX * noiseStrength * noiseValue;
                y += normY * noiseStrength * noiseValue;
                z += normZ * noiseStrength * noiseValue;

                // 更新された座標
                positions[posIndex] = x;
                positions[posIndex + 1] = y;
                positions[posIndex + 2] = z;

                // **ノイズ値に基づいたグラデーションカラー**
                const r = 1.0;
                const g = 0.5 + noiseValue * 0.5;
                const b = 0.5 - noiseValue * 0.5;

                colors.push(r, g, b);
        }
    }

        geometry.attributes.position.needsUpdate = true; // 必須: 頂点の更新をThree.jsに伝える
        geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
        geometry.attributes.position.needsUpdate = true;
        geometry.attributes.color.needsUpdate = true;

    // **法線を更新してブロブの見た目を改善**
    geometry.computeVertexNormals();
    geometry.attributes.normal.needsUpdate = true;
});

    return (
        <DraggableBase {...props}>
            <mesh ref={meshRef}>
                <sphereGeometry args={[1, 18, 18]} />
                <meshStandardMaterial vertexColors={true} roughness={0.5} metalness={0.3} />
            </mesh>
        </DraggableBase>
    );
};

export default SlowVirus;

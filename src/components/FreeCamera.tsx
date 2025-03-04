import { useRef, useEffect, useState } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const FreeCamera = ({ isModalOpen }: { isModalOpen: boolean }) => {
  const { camera, gl } = useThree();
  const moveSpeed = 0.1; // 基本の移動速度
  const lookSpeed = 0.002; // 視点の感度

  const direction = useRef(new THREE.Vector3()); // 前方ベクトル
  const right = useRef(new THREE.Vector3()); // 右方向ベクトル
  const velocity = useRef(new THREE.Vector3(0, 0, 0));
  const pitch = useRef(new THREE.Euler(0, 0, 0, "YXZ"));
  const isMouseDown = useRef(false);
  const [isPointerLocked, setIsPointerLocked] = useState(false);

  useEffect(() => {
    camera.position.set(0, 0, 10);
    camera.lookAt(new THREE.Vector3(0, 5, 10));
  }, [camera]);

  // モーダルが開いたらPointer Lockを解除
  useEffect(() => {
    if (isModalOpen && isPointerLocked) {
      document.exitPointerLock();
      setIsPointerLocked(false);
    }
  }, [isModalOpen, isPointerLocked]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!isMouseDown.current || isModalOpen) return;
      pitch.current.y -= event.movementX * lookSpeed; // 左右の回転のみ
    };

    const handleMouseDown = (event: MouseEvent) => {
      if (isModalOpen) return; // モーダルが開いているときは `Pointer Lock` を適用しない

      // 右クリック (button === 2) のときだけ Pointer Lock を適用
      if (event.button === 2) {
        if (isPointerLocked) {
          document.exitPointerLock(); // 解除
        } else {
          gl.domElement.requestPointerLock(); // 適用
        }
      } else if (isPointerLocked) {
        isMouseDown.current = true;
      }
      // isMouseDown.current = true;
    };

    const handleMouseUp = () => {
      isMouseDown.current = false;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isModalOpen) return;
      switch (event.code) {
        case "KeyW":
          velocity.current.z = moveSpeed;
          break;
        case "KeyS":
          velocity.current.z = -moveSpeed;
          break;
        case "KeyA":
          velocity.current.x = -moveSpeed;
          break;
        case "KeyD":
          velocity.current.x = moveSpeed;
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.code) {
        case "KeyW":
        case "KeyS":
          velocity.current.z = 0;
          break;
        case "KeyA":
        case "KeyD":
          velocity.current.x = 0;
          break;
      }
    };

    // Esc キーで Pointer Lock を解除
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        document.exitPointerLock();
      }
    };

    // Pointer Lock の状態を監視
    const handlePointerLockChange = () => {
      setIsPointerLocked(document.pointerLockElement === gl.domElement);
    };

    document.addEventListener("pointerlockchange", handlePointerLockChange);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener(
        "pointerlockchange",
        handlePointerLockChange
      );
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [gl, isPointerLocked, isModalOpen]);

  useFrame(() => {
    if (isModalOpen) return;

    // if (!isPointerLocked) {
    //   pitch.current.y = 0; // 視点をリセット
    // }

    // y 軸の回転はしない

    // カメラの前方ベクトルを更新
    camera.getWorldDirection(direction.current);

    // カメラの右方向ベクトルを取得（前方ベクトルと Y軸の外積）
    right.current
      .crossVectors(direction.current, new THREE.Vector3(0, 1, 0))
      .normalize();

    // X,Y軸の移動(Z軸は固定)
    camera.position.addScaledVector(direction.current, velocity.current.z); // 前後の移動
    camera.position.addScaledVector(right.current, velocity.current.x); // 左右の移動

    // カメラの回転を更新
    camera.quaternion.setFromEuler(pitch.current);
  });

  return null;
};

export default FreeCamera;

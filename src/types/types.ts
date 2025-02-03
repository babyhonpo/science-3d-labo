import * as THREE from "three";
import { RefObject } from "react";

export type ObjectType = {
  symbol: string;
  color: string;
  name?: string;
};

export type DraggableObject = {
  id: string;
  objInfo: ObjectType;
  mesh: RefObject<THREE.Mesh>;
  position: THREE.Vector3;
  radius: number;
};

export type DraggableProps = {
  refData: DraggableObject;
  position: THREE.Vector3;
  onDragStateChange: (isDragging: boolean) => void;
  onCollide: (idA: string, idB: string) => void; // ✅ handleCollision に統一
  objectsRef: Map<string, DraggableObject>;
  objInfo: ObjectType;
};

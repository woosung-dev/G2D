/* eslint-disable react/no-unknown-property */
import { useLoader } from "@react-three/fiber";
import { useMemo } from "react";
import { Mesh } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import style from "./obj.module.scss";

interface IProps {
	objUrl?: string; //경로
}
const CustomModelObject = ({ objUrl }: IProps) => {
	const obj = useLoader(OBJLoader, objUrl ?? "/s.obj");
	const geometry = useMemo(() => {
		let g;
		obj.traverse((c) => {
			if (c.type === "Mesh") {
				const _c = c as Mesh;
				g = _c.geometry;
			}
		});
		return g;
	}, [obj]);

	return (
		<div className={style["img-wrapper"]}>
			<Canvas>
				<OrbitControls position={[5, 1, 5]} />
				<Suspense fallback={null}>
					<Environment preset="city" />
				</Suspense>
				<Suspense fallback={null}>
					<>
						<mesh geometry={geometry} scale={0.08}>
							<meshPhysicalMaterial />
						</mesh>
					</>
				</Suspense>
			</Canvas>
		</div>
	);
};

export default CustomModelObject;

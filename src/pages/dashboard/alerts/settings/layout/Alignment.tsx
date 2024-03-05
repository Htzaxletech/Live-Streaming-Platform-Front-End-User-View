/* eslint-disable @typescript-eslint/no-unused-vars */
import { FaImage } from "react-icons/fa";
import { TbAlignLeft } from "react-icons/tb";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { changeFormData } from "@store/slices/alertSlice";
import { RootState } from "@store/index";
import { useDispatch, useSelector } from "react-redux";

const Alignment = () => {
	const { layout } = useSelector((state: RootState) => state.alert.data);
	const dispatch = useDispatch();

	return (
		<>
			<RadioGroup.Root
				className="flex flex-col gap-3"
				defaultValue={layout}
				aria-label="View layout"
				onValueChange={(value) => {
					dispatch(changeFormData({ layout: value }));
				}}
			>
				<div className="flex gap-3">
					<div className="flex items-center grow">
						<RadioGroup.Item
							className="hidden"
							value="1"
							id="r1"
						></RadioGroup.Item>
						<div
							className={`${
								layout === "1"
									? "border-black dark:border-zinc-300"
									: ""
							} w-full h-20 border-2 rounded-lg hover:border-black dark:border-zinc-500 dark:hover:border-zinc-300`}
						>
							<label htmlFor="r1">
								<div className="flex justify-center items-start pt-3 gap-1 h-full">
									<FaImage className="text-3xl" />
									<TbAlignLeft className="text-3xl" />
								</div>
							</label>
						</div>
					</div>
					<div className="flex items-center grow">
						<RadioGroup.Item
							className="hidden"
							value="2"
							id="r2"
						></RadioGroup.Item>
						<div
							className={`${
								layout === "2"
									? "border-black dark:border-zinc-300"
									: ""
							} w-full h-20 border-2 rounded-lg hover:border-black dark:border-zinc-500 dark:hover:border-zinc-300`}
						>
							<label htmlFor="r2">
								<div className="flex justify-center items-start pt-3 gap-1 h-full">
									<TbAlignLeft className="text-3xl" />
									<FaImage className="text-3xl" />
								</div>
							</label>
						</div>
					</div>
				</div>

				<div className="flex gap-3">
					<div className="flex items-center grow">
						<RadioGroup.Item
							className="hidden"
							value="3"
							id="r3"
						></RadioGroup.Item>
						<div
							className={`${
								layout === "3"
									? "border-black dark:border-zinc-300"
									: ""
							} w-full h-20 border-2 rounded-lg hover:border-black dark:border-zinc-500 dark:hover:border-zinc-300`}
						>
							<label htmlFor="r3">
								<div className="flex justify-center items-center h-full flex-col">
									<FaImage className="text-3xl" />
									<TbAlignLeft className="text-3xl -m-3" />
								</div>
							</label>
						</div>
					</div>
					<div className="flex items-center grow">
						<RadioGroup.Item
							className="hidden"
							value="4"
							id="r4"
						></RadioGroup.Item>
						<div
							className={`${
								layout === "4"
									? "border-black dark:border-zinc-300"
									: ""
							} w-full h-20 border-2 rounded-lg hover:border-black dark:border-zinc-500 dark:hover:border-zinc-300`}
						>
							<label htmlFor="r4">
								<div className="flex justify-center items-center h-full flex-col">
									<TbAlignLeft className="text-3xl" />
									<FaImage className="text-3xl -m-3" />
								</div>
							</label>
						</div>
					</div>
					<div className="flex items-center grow">
						<RadioGroup.Item
							className="hidden"
							value="5"
							id="r5"
						></RadioGroup.Item>
						<div
							className={`${
								layout === "5"
									? "border-black dark:border-zinc-300"
									: ""
							} w-full h-20 border-2 rounded-lg hover:border-black dark:border-zinc-500 dark:hover:border-zinc-300`}
						>
							<label htmlFor="r5">
								<div className="flex justify-center items-center h-full flex-col mt-4">
									<FaImage className="text-3xl -m-8" />
									<TbAlignLeft className="text-3xl" />
								</div>
							</label>
						</div>
					</div>
				</div>
			</RadioGroup.Root>
		</>
	);
};

export default Alignment;

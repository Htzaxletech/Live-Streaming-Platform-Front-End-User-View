import { Label } from "@radix-ui/react-dropdown-menu";
import Input from "@components/ui/Input";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store/index";
import { changeFormData } from "@store/slices/alertSlice";

const PreviewOptions = () => {
	const dispatch = useDispatch();

	const { width, height } = useSelector(
		(state: RootState) => state.alert.data
	);
	
	return (
		<div className="mx-3 sticky bottom-16 bg-background-base shadow z-10 rounded px-4 py-2">
			<div className="flex flex-col md:flex-row justify-between items-center text-xs w-full gap-2">
				<Label className="font-semibold flex justify-start w-full">
					Preview Options
				</Label>
				<div className="flex flex-col md:flex-row gap-2 items-center w-full">
					<div className="flex items-center gap-2 justify-start w-full">
						<Label className="font-semibold">Width px</Label>
						<Input
							size="sm"
							className="w-14"
							onChange={(i) => {
								if (i.target.value) {
									dispatch(
										changeFormData({
											width: parseInt(i.target.value),
										})
									);
								} else {
									dispatch(changeFormData({ width: 0 }));
								}
							}}
							value={width}
						/>
					</div>
					<div className="flex items-center gap-2 justify-start w-full">
						<Label className="font-semibold">Height px</Label>
						<Input
							size="sm"
							className="w-14"
							onChange={(i) => {
								if (i.target.value) {
									dispatch(
										changeFormData({
											height: parseInt(i.target.value),
										})
									);
								} else {
									dispatch(changeFormData({ height: 0 }));
								}
							}}
							value={height}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PreviewOptions;
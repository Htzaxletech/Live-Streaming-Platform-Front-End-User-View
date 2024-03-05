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
		<div className="sticky bottom-16 bg-background-base shadow z-10 flex justify-between items-center mx-3 rounded px-4 py-2 text-xs">
			<Label className="font-semibold">Preview Options</Label>
			<div className="flex gap-2 items-center">
				<Label className="font-semibold">Width px</Label>
				<Input
					size="sm"
					className="w-14"
					onChange={(i) => {
						if (i.target.value) {
							dispatch(
								changeFormData({ width: parseInt(i.target.value) })
							);

						} else {
							dispatch(
								changeFormData({ width: 0 })
							);
						}
					}}
					value={width}
				/>
				<Label className="font-semibold">Height px</Label>
				<Input
					size="sm"
					className="w-14"
					onChange={(i) => {
						if (i.target.value) {
							dispatch(
								changeFormData({ height: parseInt(i.target.value) })
							);
						} else {
							dispatch(
								changeFormData({ height: 0 })
							);
						}
					}}
					value={height}
				/>
			</div>
		</div>
	);
}

export default PreviewOptions;
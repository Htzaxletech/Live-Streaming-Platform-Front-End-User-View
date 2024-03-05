import Button from "@components/ui/Button";

const DangerZone = () => {

	return (
		<div className="p-4">
			<div className="flex w-full flex-col gap-2">
				<p className="text-xs font-semibold">These actions can not be undone</p>
				<Button color="danger" size="lg" className="w-full">
					Delete Variant
				</Button>
			</div>
		</div>
	);
};

export default DangerZone;

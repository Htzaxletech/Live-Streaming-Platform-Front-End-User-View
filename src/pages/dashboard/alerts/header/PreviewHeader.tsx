import Button from "@components/ui/Button";

const PreviewHeader = () => {
	return (
		<div className="sticky top-[50px] shadow z-20 bg-background-body flex justify-between items-center px-4 py-2">
			<div>
				<Button>Back to Alerts Home</Button>
			</div>
			<div>
				<h6 className="font-semibold">Alert Box 2</h6>
			</div>
			<div className="flex items-center gap-2">
				<Button color="default" size="lg">
					Discard Changes
				</Button>
				<Button color="primary" size="lg">
					Save Changes
				</Button>
			</div>
		</div>
	);
};

export default PreviewHeader;

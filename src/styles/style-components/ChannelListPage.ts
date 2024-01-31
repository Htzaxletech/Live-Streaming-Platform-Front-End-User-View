import styled from "@emotion/styled";

export const StyledList = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: 12px;

	@media (min-width: 640px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (min-width: 768px) {
		grid-template-columns: repeat(3, 1fr);
	}

	@media (min-width: 1024px) {
		grid-template-columns: repeat(4, 1fr);
	}

	@media (min-width: 1280px) {
		grid-template-columns: repeat(5, 1fr);
	}
`;

export const StyledItem = styled.div<{ backgroundImage: string }>`
	height: 176px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 0.25rem;
	background-image: url("${(props) => props.backgroundImage}");
	background-size: cover;
	background-repeat: no-repeat;
	cursor: pointer;

	> div {
		text-align: center;

		> img {
			margin: 0 auto;
			width: 4rem;
			height: 4rem;
			border-radius: 50%;
			object-fit: cover;
		}

		> h1 {
			color: white;
		}
	}
`;

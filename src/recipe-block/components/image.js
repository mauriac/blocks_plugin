/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { RichText, MediaUpload, useBlockProps, MediaUploadCheck } from "@wordpress/block-editor";
import { Button } from "@wordpress/components";

export default function ImageCustom( props ) {
	const {
		attributes: { pictureURL, imageWidth, imageHeight, pictureAlt },
		setAttributes,
		isSelected,
	} = props.props;

	const blockProps = useBlockProps();

	const onSelectImage = (media) => {
		setAttributes({
			pictureURL: media.url,
			pictureAlt:media.alt
		});
	};

	const onRemoveImage = () => {
		setAttributes({
			pictureURL: null,
			pictureAlt: null
		})
	}

	return (
		<div {...blockProps}>
		{ ! pictureURL ? (
			<MediaUploadCheck>
					<MediaUpload
						onSelect={onSelectImage}
						allowedTypes="image"
						value={pictureURL}
						render={({ open }) => (
							<Button
								className={"button button-large"}
								onClick={open}
							>
								{ __("Upload Image", "gutenberg-examples") }
							</Button>
						)}
					/>
			</MediaUploadCheck>
		) : (
			<>
				<div>
					<img
						src={ pictureURL }
						width={ imageWidth }
						height={ imageHeight }
						alt={ pictureAlt }
					/>
				</div>
				<div>
					{ isSelected && (
						<Button
							variant="primary"
							onClick={ onRemoveImage }
							icon="dismiss"
						>
							{ __( 'Remove picture', 'blocks-plugin' ) }
						</Button>
					) }
				</div>
			</>
		) }
		</div>
	);
}

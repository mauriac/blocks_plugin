/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save( props ) {
	const {
		attributes: { title, ingredientList, imageWidth, imageHeight, pictureAlt, pictureURL },
	} = props;

	return (
		<div { ...useBlockProps.save() }
		style={ {
			backgroundColor: props.attributes.backgroundColor,
		} }
		>
			<RichText.Content
				tagName="h2"
				value={ title }
			/>
			<h3>{ __( 'Ingredients', 'blocks-plugin' ) }</h3>
				<ul>
					{ ingredientList?.length > 0 && 
					ingredientList.map(
						(item) => <li> {item} </li>
						)
					}
				</ul>
				{ pictureURL &&
				<img
					src={ pictureURL }
					width={ imageWidth }
					height={ imageHeight }
					alt={ pictureAlt }
				/>
				}
		</div>
	);
}

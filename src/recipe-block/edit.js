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
import { useBlockProps,
	RichText,
	InspectorControls,
	PanelColorSettings,
	__experimentalImageSizeControl as ImageSizeControl
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	Button
} from '@wordpress/components'
import { Fragment } from '@wordpress/element'

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import ImageCustom from "./components/image";
import React from 'react';

const { useState } = React;

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit(props) {
	const {
		attributes: { title, ingredientList, imageWidth, imageHeight, backgroundColor },
		setAttributes,
	} = props;

	const [ingredientText, setIngredientText] = useState('');

	const onChangeTitle = ( value ) => {
		setAttributes( { title: value } );
	};
	const addIngredient = ( ) =>{
		if (ingredientText.trim().length > 0 ) {
			let tempArr = [ ...ingredientList ];
	
			tempArr.push(ingredientText);
			setAttributes( { ingredientList: tempArr } );
			setIngredientText('');
		}
	}
	// In this example, we have one image with a fixed size of 600x600.
	const dimensionWidth = 400;
	const dimensionHeight = 400;
	const updateImgSize = ( value ) => {
		setAttributes({
			imageWidth: value?.width ?? imageWidth,
			imageHeight: value?.height ?? imageHeight
		})
	}

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={ __( 'Add ingredient', 'blocks-plugin' ) }>
					<TextControl
						value={ ingredientText }
						onChange={ ( nextValue ) => setIngredientText( nextValue ?? '' ) }
					/>
					<Button
						isPrimary = { true }
						onClick={ addIngredient }
					 >
					 	{ __('add new', 'blocks-plugin') }
					 </Button>

					<ImageSizeControl
						onChange={ ( value ) => updateImgSize( value ) }
						width={ imageWidth }
						height={ imageHeight }
						imageWidth={ dimensionWidth }
						imageHeight={ dimensionHeight }
					/>
				</PanelBody>

				<PanelColorSettings
					title={ __( 'Colors', 'blocks-plugin' ) }
					colorSettings={ [
						{
							value: backgroundColor,
							onChange: backgroundColor => setAttributes( { backgroundColor } ),
							label: __( 'Background color', 'blocks-plugin' ),
						},
					] }
				/>
			</InspectorControls>

			<div { ...useBlockProps() }
				style={ {
					backgroundColor: backgroundColor,
				} }
				>
				<RichText
					tagName="h2"
					placeholder={ __(
						'Recipe title',
						'blocks-plugin'
					) }
					value={ title }
					onChange={ onChangeTitle }
				/>
				<h2>{ __( 'Ingredients', 'blocks-plugin' ) }</h2>
				<ul>
					{ ingredientList?.length > 0 && 
					ingredientList.map(
						(item) => <li> { item } </li>
						)
					}
				</ul>
				<ImageCustom props={ props } />
			</div>
		</Fragment>
	);
}

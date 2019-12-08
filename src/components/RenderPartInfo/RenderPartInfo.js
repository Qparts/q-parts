import React, { Component, Fragment } from 'react';
import { Field } from 'redux-form';
//import RenderField from '../RenderField/RenderField';
import Button from '../UI/Button';
import * as validations from '../../utils';
import NumberPicker from '../UI/NumberPicker';
import RenderFileInput from '../RenderFileInput/RenderFileInput';
import SelectInput from '../SelectInput/SelectInput';
import RenderField from '../RenderField/RenderField';
const partCondition = [{ value: 1, label: 'New' }, { value: 2, label: 'Used' }];
const groupedPartCondition = [
	{
		options: partCondition
	}
];
const formatPartConditionLabel = () => (
	<div className='placeholder'>
		<span>Select Part Condition</span>
	</div>
);

class RenderPartInfo extends Component {
	componentDidMount() {
		const { fields } = this.props;
		fields.push({
			itemName: '',
			image: '',
			quantity: 1
		});
	}

	render() {
		const {
			fields,
			meta: { error, submitFailed }
		} = this.props;
		return (
			<div>
				{submitFailed && error && <span>{error}</span>}
				{fields.map((partInfo, idx) => (
					<Fragment key={idx}>
						<div className='row'>
							<div className='col-md'>
								<div className='add-file'>
									<Field
										maxLength='200'
										type='text'
										hasFloatLabel
										name={`${partInfo}.itemName`}
										className='form-control'
										component={RenderField}
										label={this.props.placeholder}
										placeholder={this.props.placeholder}
										validate={[validations.required]}
									/>
									<Field
										name={`${partInfo}.image`}
										image={`${partInfo}.image`}
										component={RenderFileInput}
									/>
								</div>
							</div>
							<div className='col-md-auto part-actions'>
								<Field
									name={`${partInfo}.quantity`}
									btnGray='btn-gray'
									component={NumberPicker}
								/>
								<Button
									type='reset'
									disabled={idx === 0}
									className='btn delete-part'
									icon={this.props.deleteIcon}
									onClick={() => fields.remove(idx)}
								/>
							</div>
						</div>
					</Fragment>
				))}
				<div className='row'>
					<div className='col add-part'>
						<Button
							isReverseOrder
							type='reset'
							className='btn'
							text={this.props.add}
							icon='icon-plus'
							onClick={() =>
								fields.push({
									itemName: '',
									image: '',
									quantity: 1
								})
							}
						/>
					</div>
				</div>
			</div>
		);
	}
}
export default RenderPartInfo;

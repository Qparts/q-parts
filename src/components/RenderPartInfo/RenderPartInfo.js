import React, { Component } from 'react';
import { Field } from 'redux-form'
import RenderField from '../RenderField/RenderField';
import Button from '../UI/Button';
import * as validations from '../../utils';
import NumberPicker from '../UI/NumberPicker';
import RenderFileInput from '../RenderFileInput/RenderFileInput';

class RenderPartInfo extends Component {

    componentWillMount() {
        const { fields } = this.props;
        fields.push({
            itemName: '',
            image: '',
            quantity: 1
        });
    }

    render() {
        const { fields, meta: { error, submitFailed } } = this.props;
        return (
            <div>
                {submitFailed && error && <span>{error}</span>}
                {fields.map((partInfo, idx) => (
                    <div key={idx} className="row parts-container">
                        
                        <div className="col-8">
                            <Field
                                className="select-field-make"
                                name={`${partInfo}.itemName`}
                                type="text"
                                component={RenderField}
                                placeholder={this.props.placeholder}
                                validate={[validations.required]}
                            />

                            <Field
                            name={`${partInfo}.image`}
                            image={`${partInfo}.image`}
                            component={RenderFileInput}
                        />
                        </div>

                        {/* <Field
     name={`${partInfo}.condition`}
     className="QuotationRequest-selectInput"
     component={SelectInput}
     options={[
      { value: 'genuine', label: 'Genuine' },
      { value: 'nonGenuine ', label: 'Non-genuine' },
      { value: 'all ', label: 'All' }
     ]}
    /> */}
                        <div className="col-3">
                            <Field
                                name={`${partInfo}.quantity`}
                                component={NumberPicker}
                            />
                        </div>
                        <div className="col-1 padding-left-0">
                            <Button
                                type="button"
                                className="btn btn-primary"
                                text={this.props.deleteButton}
                                onClick={() => fields.remove(idx)}
                            />
                        </div>
                    </div>
                ))}
                <div className="add-part-btn-container">
                    <Button type="reset" className="btn" text={this.props.add}
                        onClick={() => fields.push({
                            itemName: '',
                            image: '',
                            // condition: '',
                            quantity: 1
                        })}
                    />
                </div>
            </div>
        )
    }

}
export default RenderPartInfo;
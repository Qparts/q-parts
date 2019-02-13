import React, { Component, Fragment } from 'react';
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
                    <Fragment key={idx}>
                        <div className="row parts-container">
                            <div className="col-md-8 col-12">
                                <Field
                                    className="part-desc-field"
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
                            <div className="col-10 col-md-3 number-picker-container">
                                <Field
                                    name={`${partInfo}.quantity`}
                                    btnGray="btn-gray"
                                    component={NumberPicker}
                                />
                            </div>
                            <div className="col-md-1 col-1 delete-btn-container">
                                <Button
                                    type="reset"
                                    disabled={idx === 0}
                                    className="btn"
                                    icon={this.props.deleteIcon}
                                    onClick={() => fields.remove(idx)}
                                />
                            </div>
                        </div>

                    </Fragment>

                ))}
                <div className="add-part-btn-container">
                    <Button isReverseOrder type="reset" className="btn" text={this.props.add} icon="icon-plus"
                        onClick={() => fields.push({
                            itemName: '',
                            image: '',
                            quantity: 1
                        })}
                    />
                </div>
            </div>
        )
    }

}
export default RenderPartInfo;
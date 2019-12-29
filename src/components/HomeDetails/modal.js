import React, { Component } from "react" ; 
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import SelectInput from '../../components/SelectInput/SelectInput';
import RenderField from '../../components/RenderField/RenderField';
import * as validations from '../../utils';
import { DownLargeScreen, LargeScreen } from '../../components/Device';
import { Field} from 'redux-form';
import { UncontrolledPopover, PopoverBody } from 'reactstrap';
import { Link} from 'react-router-dom';
import { getTranslatedObject } from '../../utils';
// import 'bootstrap/dist/css/bootstrap.min.css';


class vehiclePartsModal extends Component {
    constructor(props){
           super(props);
         this.state={
            modal: false,
			open: false,
			vin: 'JTHBJ46G9B2420251',
			vinInput: "",
         }
    }



render(){
    const {
        translate,
        currentLanguage,
    } = this.props;

    console.log(this.props);
    
    const makeData = this.props.vehicle.map(vehicle => {
        return {
            ...vehicle,
            label: getTranslatedObject(
                vehicle,
                currentLanguage,
                'name',
                'nameAr'
            ),
            value: vehicle.id
        };
    });

    const groupedvehicleMake = [
        {
            options: makeData
        }
    ];

    const formatvehicleMakeLabel = () => (
        <div className='placeholder'>
            <span>{translate('general.vehicle.make')}</span>
        </div>
    );


    return(
        <Modal isOpen={this.state.modal} toggle={this.props.toggle} className="modal-xl vin-modal" backdrop="false" >
        <ModalHeader toggle={this.toggle}>
            {translate('vehicleInfo.popupVinNumTitle')}
            <LargeScreen><span>{translate('vehicleInfo.popupVinNumSubTitle')}</span></LargeScreen>
        </ModalHeader>
        <ModalBody>
            <form className="gray-input row">
                <div className="col-md-auto float-label make">
                    <Field
                        onChange={e => this.setState(() => ({
                            selectedVehicle: e.name,
                        }))}
                        label="Make"
                        name="make"
                        placeholder={' '}
                        component={SelectInput}
                        options={groupedvehicleMake}
                        formatGroupLabel={
                            formatvehicleMakeLabel
                        }
                    />
                </div>
                <div className="col">
                    <Field
                        onChange={e =>
                            console.log(e.target.value)

                            // 	 this.setState(() => ({
                            // 	vinInput: e.currentTarget.defaultValue
                            // }))
                        }
                        ref={this.vinFieldRef}
                        value={this.state.vinInput}
                        hasFloatLabel
                        name="VIN/Frame"
                        type="text"
                        placeholder={translate("general.VINInput.placeholder")}
                        label={translate("general.VINInput.label")}
                        errorMessage={`${translate("general.enter")} ${translate("general.VINInput.label")}`}
                        component={RenderField}
                        validate={[validations.required]}
                    />
                    <div className="VIN-info">
                        <p onClick={() => {
                            this.state.vinInput = this.state.vin;
                        }}>{translate("vehicleInfo.VINNumberEx")}:{this.state.vin}</p>
                        <div>
                            <p className="id-img" id="UncontrolledPopover" type="text">
                            <i className="icon-info"></i> {translate("vehicleInfo.carId")}
                            </p>
                            <UncontrolledPopover placement="top-start" target="UncontrolledPopover">
                                {/* <PopoverHeader>Popover Title</PopoverHeader> */}
                                <PopoverBody><img alt="" src="/img/vin-ex.jpg"/></PopoverBody>
                            </UncontrolledPopover>
                        </div>
                    </div>
                </div>
                <div className="col-lg-auto actions">
                    <div className="row">
                        <DownLargeScreen>
                            <div className="col-auto">
                                <button type="submit" className='btn btn-gray'>{translate("general.buttons.cancel")}</button>
                            </div>
                        </DownLargeScreen>
                        <div className="col-md-auto col">
                            <Link to="">
                                <button type="submit" className='btn btn-primary' >{translate("vehicleInfo.browseCatalogueBtn")}<i className="icon-arrow-right"></i></button>
                            </Link>
                        </div>
                    </div>

                </div>
            </form>
        </ModalBody>
    </Modal>
    )
}
}

const mapStateToProps = state => {
	return {
		translate: getTranslate(state.localize)
	};
};


export default connect(
	mapStateToProps,
	null
)(vehiclePartsModal);

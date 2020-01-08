import React, { Component, Fragment } from "react"; // eslint-disable-line no-unused-vars
import { Field, reduxForm } from "redux-form";
import SelectInput from "../../components/SelectInput/SelectInput";
import { getTranslate } from "react-localize-redux";
import { connect } from "react-redux";
import { getTranslatedObject } from "../../utils";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import * as validations from "../../utils";
import { MediumScreen, DownMediumScreen } from "../../components/Device";

export class TiresForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicle: [],
      selectedTireWidth: {
        id: null
      },
      selectedTireHeigth: {
        id: null
      },
      selectedTireDiameter: {
        id: null
      }
    };
  }

  // submit = () => {
  // 	console.log("ay7aga");

  // 	this.props.history.push(`/listing?query=&page=1&&category=13&width=${this.state.selectedTireWidth}&height=${this.state.selectedTireHeigth}&diameter=${this.state.selectedTireDiameter}`);
  // }

  render() {
    const { translate } = this.props;
    const { currentLanguage } = this.props;

    const tires = [
      {
        id: 1,
        label: 15,
        heigths: [
          {
            widthId: 1,
            id: 10,
            label: 35,
            diameters: [{ widthId: 1, id: 12, label: 14 }]
          },
          {
            widthId: 1,
            id: 11,
            label: 25,
            diameters: [{ widthId: 1, id: 13, label: 16 }]
          },
          {
            widthId: 1,
            id: 12,
            label: 33,
            diameters: [{ widthId: 1, id: 14, label: 25 }]
          }
        ]
      },
      {
        id: 2,
        label: 115,
        heigths: [
          {
            widthId: 2,
            id: 13,
            label: 10,
            diameters: [{ widthId: 2, id: 15, label: 20 }]
          },
          {
            widthId: 2,
            id: 16,
            label: 56,
            diameters: [{ widthId: 2, id: 17, label: 44 }]
          }
        ]
      },
      {
        id: 3,
        label: 125,
        heigths: [
          {
            widthId: 3,
            id: 40,
            label: 55,
            diameters: [{ widthId: 3, id: 54, label: 239 }]
          },
          {
            widthId: 3,
            id: 23,
            label: 123,
            diameters: [{ widthId: 3, id: 23, label: 46 }]
          }
        ]
      }
    ];

    const tireWidth = tires.map(tire => {
      return {
        ...tire,
        label: getTranslatedObject(tire, currentLanguage, "label"),
        value: tire.id
      };
    });
    console.log(tires);
    const groupedWidthTiresOptions = [
      {
        options: tireWidth
      }
    ];

    const formatWidthTiresGroupLabel = () => (
      <div className="placeholder">
        <span>
          {translate("general.select")} {translate("tires.placeholders.width")}
        </span>
      </div>
    );

    let tireHeigths = null;
    const selectedWidth = tires.find(tire =>
      tire.heigths.some(
        heigth => heigth.widthId === this.state.selectedTireWidth.id
      )
    );
    if (selectedWidth) {
      tireHeigths = selectedWidth.heigths.map(heigth => {
        return {
          label: getTranslatedObject(heigth, currentLanguage, "label"),
          value: heigth.id,
          diameters: heigth.diameters
        };
      });
    } else {
      tireHeigths = [
        { value: "no options", label: "no options", diameters: [{}] }
      ];
    }

    const groupedHeightTiresOptions = [
      {
        options: tireHeigths
      }
    ];

    const formatHeightTiresGroupLabel = () => (
      <div className="placeholder">
        <span>
          {translate("general.select")} {translate("tires.placeholders.height")}
        </span>
      </div>
    );

    let tireDiameter = null;
    if (
      tireHeigths &&
      this.state.selectedTireHeigth &&
      this.state.selectedTireHeigth.diameters
    ) {
      tireDiameter = tireHeigths
        .find(heigth => heigth.id === this.state.selectedTireHeigth.id)
        .diameters.map(diameter => {
          return {
            label: getTranslatedObject(diameter, currentLanguage, "label"),
            value: diameter.id
          };
        });
    } else {
      tireDiameter = [{ value: "no options", label: "no options" }];
    }

    const groupedDiameterTiresOptions = [
      {
        options: tireDiameter
      }
    ];

    const formatDiameterTiresGroupLabel = () => (
      <div className="placeholder">
        <span>
          {translate("general.select")}{" "}
          {translate("tires.placeholders.diameter")}
        </span>
      </div>
    );

    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          this.props.history.push(
            `/listing?query=&page=1&&category=13&width=${this.state.selectedTireWidth.label}&height=${this.state.selectedTireHeigth.label}&diameter=${this.state.selectedTireDiameter.label}`
          );
        }}
        className="form-row select-white"
      >
        <div className="col float-label">
          <Field
            onChange={e =>
              this.setState(() => ({
                selectedTireWidth: e
              }))
            }
            label={translate("tires.placeholders.width")}
            name="width"
            placeholder={" "}
            component={SelectInput}
            options={groupedWidthTiresOptions}
            formatGroupLabel={formatWidthTiresGroupLabel}
          />
        </div>
        <div className="col float-label">
          <Field
            onChange={e =>
              this.setState(() => ({
                selectedTireHeigth: e
              }))
            }
            label={translate("tires.placeholders.height")}
            name="height"
            placeholder={" "}
            component={SelectInput}
            options={groupedHeightTiresOptions}
            formatGroupLabel={formatHeightTiresGroupLabel}
          />
        </div>
        <div className="col float-label">
          <Field
            onChange={e =>
              this.setState(() => ({
                selectedTireDiameter: e
              }))
            }
            label={translate("tires.placeholders.diameter")}
            name="diameter"
            placeholder={" "}
            component={SelectInput}
            options={groupedDiameterTiresOptions}
            formatGroupLabel={formatDiameterTiresGroupLabel}
          />
        </div>
        <div className="col-md-auto">
          <button type="submit" className="btn btn-primary">
            {" "}
            {translate("general.buttons.search")}{" "}
            <i className="icon-arrow-right"></i>
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  translate: getTranslate(state.localize)
});

// const mapDispatchToProps = dispatch => {
// 	return {
// 		getVehicleService: () =>
// 			dispatch(getVehicleService())
// 	};
// };

TiresForm = reduxForm({
  form: "ManualForm"
})(TiresForm);

const withManualForm = withRouter(TiresForm);

export default connect(
  mapStateToProps
  // mapDispatchToProps
)(withManualForm);

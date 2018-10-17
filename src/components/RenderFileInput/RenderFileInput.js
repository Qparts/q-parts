import React, { Fragment, Component } from 'react';
import Button from '../UI/Button';
import Lightbox from 'react-images';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

import './RenderFileInput.css';

const originalImage = 'originalImage';
const convertedImg = 'convertedImg';
const canvas = 'canvas';

class renderFileInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      lightboxIsOpen: false,
    }
  }

  closeLightbox = () => {
    this.setState({
      lightboxIsOpen: false,
    });
  }

  showLightbox = () => {
    this.setState({
      lightboxIsOpen: true,
    });
  }

  updateCanvas = (imgElm, canvasElm, width, height) => {
    const ctx = canvasElm.getContext('2d');

    ctx.drawImage(imgElm, 0, 0, width, height);
  }

  onImageUpload = (imageSrc) => {
    return new Promise((resolve, rejects) => {
      const { image } = this.props;
      const imageUrl = URL.createObjectURL(imageSrc);
      const imgElm = this.refs[`${originalImage}_${image}`];
      const canvasElm = this.refs[`${canvas}_${image}`];

      imgElm.src = imageUrl;
      imgElm.onload = () => {
        let width = imgElm.width;
        let height = imgElm.height;
        const maxWidth = 976;
        const maxHeight = 610;

        // calculate the width and height, constraining the proportions
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round(height *= maxWidth / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round(width *= maxHeight / height);
            height = maxHeight;
          }
        }
        canvasElm.width = width;
        canvasElm.height = height;

        this.updateCanvas(imgElm, canvasElm, width, height);
        const convertedImgElm = this.refs[`${convertedImg}_${image}`]
        const dataURL = canvasElm.toDataURL("image/jpeg", 0.5);

        convertedImgElm.src = dataURL;
        convertedImgElm.style.display = "inline"; //show the hidden pic
        convertedImgElm.style.visibility = "visible";
        URL.revokeObjectURL(imgElm.src);
        resolve(dataURL);
      }
    })
  }

  adaptFileEventToValue = (delegate) => e => {
    this.onImageUpload(e.target.files[0])
      .then(image => {
        delegate(image);
        this.setState({
          images: [{ src: image }]
        })
      })
  }
  render() {
    const { input: { onChange, onBlur }, translate, ...props } = this.props;
    return (
      <Fragment>
        <input
          className="RenderFileInput-image_input"
          onChange={this.adaptFileEventToValue(onChange)}
          onBlur={this.adaptFileEventToValue(onBlur)}
          ref={fileInput => this.fileInput = fileInput}
          type="file"
          {...props.input}
        />
        <Button text={translate("renderFileInput.uploadFile")} type="reset" onClick={() => this.fileInput.click()} />
        <div>
          <img
            style={{ display: 'none' }}
            alt="not found"
            ref={`${originalImage}_${props.image}`}
          />
          <img
            style={{ display: 'none' }}
            className="RenderFileInput-img"
            onClick={this.showLightbox}
            alt="not found"
            ref={`${convertedImg}_${props.image}`}
          />
          <canvas
            style={{ display: 'none' }}
            ref={`${canvas}_${props.image}`} />
        </div >
        <Lightbox
          images={this.state.images}
          isOpen={this.state.lightboxIsOpen}
          onClose={this.closeLightbox}
        />
      </Fragment>
    );
  }
};

const mapStateToProps = state => {
  return {
    translate: getTranslate(state.localize),
  }
}

export default connect(mapStateToProps, null)(renderFileInput);
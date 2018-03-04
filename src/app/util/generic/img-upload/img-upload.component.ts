import { Component, Input, OnInit } from '@angular/core';
import { Output } from '@angular/core/src/metadata/directives';
import { MonitorService } from '../../../monitor/service/monitor.service';

@Component({
  selector: 'app-generic-img-upload',
  templateUrl: './img-upload.component.html',
  styleUrls: ['./img-upload.component.css']
})
export class ImgUploadComponent implements OnInit {

  @Input() public imgConf: any; // = {imageSrc: '1', imageClass: 'image'};
  // @Output() public imgFile: any;
  //  fileuploader
  activeColor = 'green';
  baseColor = '#ccc';
  dragging = false;
  loaded = false;
  imageLoaded = false;

  constructor() {

  }

  ngOnInit() {
  }

  // Imagen de perfil
  handleDragEnter() {
    this.dragging = true;
  }

  handleDragLeave() {
    this.dragging = false;
  }

  handleDrop(e) {
    e.preventDefault();
    this.dragging = false;
    this.handleInputChange(e);
  }

  handleImageLoad() {
    this.imageLoaded = true;
    // this.iconColor = this.overlayColor;
  }

  handleInputChange(e) {
    this.imgConf.sendImg(e);

    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    const pattern = /image-*/;
    const reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    this.loaded = false;
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    const reader = e.target;
    this.imgConf.src = reader.result;
    this.loaded = true;
  }

  _setActive() {
    /*this.borderColor = this.activeColor;
    if (this.imageSrc.length === 0) {
        this.iconColor = this.activeColor;
    }*/
  }

  _setInactive() {
    /*  this.borderColor = this.baseColor;
      if (this.imageSrc.length === 0) {
          this.iconColor = this.baseColor;
      }*/
  }


}


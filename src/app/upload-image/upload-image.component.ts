import {Component, Input, OnInit} from '@angular/core';
import {Usuario} from "../shared/models/Usuario";

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {
  //formatData!: FormData;
  selectedFile!: any;
  @Input() usuario!: Usuario | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void{
    if(this.usuario != undefined){
      //console.log(this.usuario)
    }
  }

  onFileSelected(event: any){
    //this.formatData = new FormData();
    //const selectedFile = <File>event.target.files[0];
    //this.formatData.append('image', selectedFile, selectedFile.name)
    this.selectedFile = event.target.files[0];
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { ImageService } from '../../service/image.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {
  selectedImage: any = null;
  isSubmitted: boolean;
  imgSrc: string = '../../../assets/img/avatar.png';
  formTemplate = new FormGroup({
    caption: new FormControl('', Validators.required),
    subHeading: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required),
  });
  constructor(
    private storage: AngularFireStorage,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.resetForm();
  }
  showImagePreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgSrc = e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imgSrc = '../../../assets/img/avatar.png';
      this.selectedImage = null;
    }
  }
  onSubmit(formValue) {
    this.isSubmitted = true;
    if (this.formTemplate.valid) {
      var filePath = `images/${this.selectedImage.name
        .split('.')
        .slice(0, -1)
        .join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage
        .upload(filePath, this.selectedImage)
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              formValue['imageUrl'] = url;
              this.imageService.addSliderDetails(formValue);
              this.resetForm();
            });
          })
        )
        .subscribe();
    }
  }
  get formControls() {
    return this.formTemplate['controls'];
  }
  resetForm() {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      caption: '',
      imageUrl: '',
      subHeading: '',
      description: '',
      category: '',
    });
    this.imgSrc = '../../../assets/img/avatar.png';
    this.selectedImage = null;
    this.isSubmitted = false;
  }
}

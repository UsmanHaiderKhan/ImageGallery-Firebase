import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../service/image.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss'],
})
export class ImageListComponent implements OnInit {
  imageList: any[];
  rowIndexArray: any[];
  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    this.imageService.sliderDetailsList.snapshotChanges().subscribe((list) => {
      this.imageList = list.map((item) => {
        return item.payload.val();
      });
      this.rowIndexArray = Array.from(
        Array(Math.ceil(this.imageList.length + 1 / 3)).keys()
      );
    });
  }
}

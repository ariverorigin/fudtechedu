import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { SharedDataService, WooService } from "src/app/utilities/services";

@Component({
  selector: "app-thumbnail",
  templateUrl: "./thumbnail.component.html",
  styleUrls: ["./thumbnail.component.scss"],
})
export class ThumbnailComponent implements OnInit {
  @Input() src: string;
  @Input() height: number;
  @Input() changeDimension: boolean = true;
  defaultDimensionExtension = "-405x330";
  defaultProductImage = "/assets/images/default-thumbnail.png";
  alt: string;

  constructor(
    private sharedDataService: SharedDataService,
    private wooService: WooService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.src && changes.src.previousValue === undefined)
      this.getThumbnail();
    else if (
      changes.src &&
      changes.src.previousValue !== changes.src.currentValue
    )
      this.getThumbnail();
  }

  ngOnInit() {
    if (
      !this.src.includes(this.defaultDimensionExtension) &&
      !this.src.includes(this.defaultProductImage)
    )
      this.getThumbnail();
  }

  // better update
  getThumbnail() {
    if (!this.changeDimension) {
      this.src = this.src || this.defaultProductImage;
    } else {
      const imageUrl = this.src || "",
        fileName = (this.alt = imageUrl ? this.getFilename(imageUrl) : "");

      if (fileName) {
        const ext = fileName.split(".").reverse()[0],
          rawName = fileName.replace("." + ext, "");

        this.src = this.src.replace(
          fileName,
          rawName + this.defaultDimensionExtension + "." + ext
        );
      } else {
        this.src = this.defaultProductImage;
      }
    }
  }

  onImage404(event) {
    if (this.src)
      this.src = this.src;
    else this.src = this.defaultProductImage;
  }

  imageLoaded(event) {
    event.srcElement.className = event.srcElement.className.replace(
      "image-loading",
      ""
    );
  }

  getFilename(str) {
    return str.split("\\").pop().split("/").pop();
  }
}

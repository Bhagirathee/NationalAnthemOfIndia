import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from "@angular/core";
import { IonReorderGroup, AlertController } from "@ionic/angular";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"],
})
export class GameComponent implements OnInit, AfterViewInit {
  isValid = false;
  showMedal = false;
  items = [
    {
      id: 2,
      id2: 0,
      val: "Signifies life and prosperity",
      cls: "stripe green",
    },
    {
      id: 0,
      id2: 1,
      val: "Signifies sacrifice and patriotism",
      cls: "stripe saffron",
    },
    {
      id: 1,
      id2: 2,
      val: "Signifies peace, contains Ashoka Chakra",
      cls: "stripe white",
      showWheel: true,
    },
  ];

  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

  constructor(public alertController: AlertController) {}

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async presentAlert() {
     await this.delay(500);
    const alert = await this.alertController.create({
      cssClass: "my-custom-class fade-in",
      header: "Congratulations!!!",
      // subHeader: "Subtitle",
      message: "",
      buttons: [
        {
          text: "Get Your Medal",
          role: "OK",
          handler: async () => {
            this.showMedal = true;
          },
        },
      ],
    });

    await alert.present();
  }

  async doReorder($event: any) {
    console.log(
      "Dragged from index",
      $event.detail.from,
      "to",
      $event.detail.to
    );
    let element = this.items[$event.detail.from];
    this.items.splice($event.detail.from, 1);
    this.items.splice($event.detail.to, 0, element);
    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    $event.detail.complete();
    
    if (this.items.every((x,index)=>x.id == index)) {
      await this.presentAlert();
    }
  }

  toggleMedal() {
    this.ngOnInit();
  }

  async presentPlayAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "भारतीय ध्वज (तिरंगा)",
      message: "<strong>Drag & Drop</strong> boxes to make an Indian Flag.",
      buttons: [
        {
          text: "OK",
          handler: () => {},
        },
      ],
    });

    await alert.present();
  }

  ionViewWillEnter() {
    this.presentPlayAlertConfirm();
  }

  ngAfterViewInit() {
    //this.presentPlayAlertConfirm();
  }

  ngOnInit() {
    this.isValid = false;
    this.showMedal = false;
    this.items.sort((x, y) => x.id2 - y.id2);
  }
}

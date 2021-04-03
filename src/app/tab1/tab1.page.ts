import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  AfterViewInit,
} from "@angular/core";
import { IonSlides, AlertController } from "@ionic/angular";
import { Router, NavigationStart } from "@angular/router";
import { filter, take } from "rxjs/operators";
import { Event as NavigationEvent } from "@angular/router";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page implements OnInit, AfterViewInit {
  isConfirmedByUser = false;
  @ViewChild("audioElement") audioPlayerRef: ElementRef;
  sliderOne: any;
  audioElement: any;
  @ViewChild("signupslides", { static: false }) slides: IonSlides;
  slideNumber: number = 1;
  slideOpts = {
    initialSlide: 0,
  };
  //Configuration for each Slider
  slideOptsOne = {
    initialSlide: 0,
  };

  constructor(public alertController: AlertController, private router: Router) {
    this.audioElement = document.getElementById("myAudio");
    //Item object for Nature
    this.restartSlides();
  }

  restartSlides() {
    this.sliderOne = {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems: [
        {
          id: 7,
          bengoli: ``,
          english: ``,
          hindi: ``,
        },
        {
          id: 6,
          bengoli: `The National Anthem of India`,
          english: `It was originally composed by 
          SHRI GURUDEV RABINDRANATH TAGORE
          Indian philosopher,poet and painter.`,
          hindi: ``,
        },
        {
          id: 1,
          bengoli: "जनगणमन आधिनायक जय हे भारतभाग्यविधाता!",
          english: `The anthem opens with delight of the Almighty, 
          the leader who rules in the mind of common people,
          who guides the country’s destiny!`,
          hindi:
            "हमारे मन के शासक, जन गण मन के अधिनायक की जय हो, आपको विनम्र सलाम!",
        },
        {
          id: 2,
          bengoli: `पंजाब सिन्धु गुजरात मराठा द्राविड़ उत्कल बंग,
          विन्ध्य हिमाचल यमुना गंगा उच्छलजलधितरंग,`,
          english: `Then begins a virtual tour of 
          India, beginning in the north and circling west, mentioning the regions,
          the Vindhya and Himalaya mountain ranges and the Yamuna and Ganges rivers.
          and the rising waves of the sea,
         `,
          hindi: `उनका नाम सुनते ही पंजाब सिन्ध गुजरात और मराठा, द्राविड़ उत्कल व बंगाल
          एवं विन्ध्या हिमाचल व यमुना और गंगा पर बसे लोगों के हृदयों में मचलती मनमोहक तरंगें भर उठती हैं,`,
        },
        {
          id: 3,
          bengoli: `तव शुभ नामे जागे, तव शुभ आशीष मागें,      
          गाहे तव जयगाथा,
          जनगणमंगलदायक जय हे भारतभाग्यविधाता!`,
          english: `all awake with your gracious name,
          seek for your blessings,
          sing your victories!`,
          hindi: `सब तेरे पवित्र नाम पर जाग उठते हैं, सब तेरे पवित्र आशीर्वाद पाने की अभिलाषा रखते हैं
          और तेरे ही जयगाथाओं का गान करते हैं!`,
        },
        {
          id: 4,
          bengoli: `जय हे, जय हे, जय हे, जय जय जय जय हे।।`,
          english: `Victory! Victory forever to you।।`,
          hindi: `हे भारत के भाग्यविधाता, तेरी सदा सर्वदा विजय हो।।`,
        },
        {
          id: 5,
          bengoli: `Unbox the Surprise!!!`,
          english: `Tap the flag`,
          hindi: ``,
        },
      ],
    };
  }
  ngAfterViewInit() {}

  ngOnInit() {
    this.router.events
      .pipe(
        //An event triggered when navigation starts.
        filter((event: NavigationEvent) => {
          return event instanceof NavigationStart;
        })
      )
      .subscribe((event: NavigationStart) => {
        this.pauseAudio();
       // this.sildeShow();
      });
  }

  async sildeShow() {
    this.restartSlides();
    this.slides.slideTo(0);
    if (!this.isConfirmedByUser) {
      return;
    }
    this.slides.slideTo(1);
    await this.delay(5000).then(async () => {
      if (this.isConfirmedByUser) this.slides.slideTo(2);

      await this.delay(10000).then(async () => {
        if (this.isConfirmedByUser) this.slides.slideTo(3);

        await this.delay(22000).then(async () => {
          if (this.isConfirmedByUser) this.slides.slideTo(4);

          await this.delay(26000).then(async () => {
            if (this.isConfirmedByUser) this.slides.slideTo(5);

            await this.delay(16000).then(() => {
              if (this.isConfirmedByUser) this.slides.slideTo(6);
            });
          });
        });
      });
    });

    this.pauseAudio();
    this.isConfirmedByUser = false;
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Get ready to sing 'Jana GaNa Mana' on music track!",
      message: "Set the <strong>Volume</strong> of your mobile!",
      buttons: [
        {
          text: "Play National Anthem",
          handler: () => {
            this.playAudio();
            this.isConfirmedByUser = true;
            this.sildeShow();
          },
        },
      ],
    });

    await alert.present();
  }

  goToGame() {}

  playAudio() {
    this.pauseAudio();
    this.audioPlayerRef.nativeElement.play();
  }

  pauseAudio() {
    this.audioPlayerRef.nativeElement.currentTime = 17;
    this.audioPlayerRef.nativeElement.pause();
  }

  slideShowEnd() {
    console.log("ended");
    this.pauseAudio();
    this.slides.slideTo(0);
    //this.router.navigate(["tabs/game"]);
  }

  public routeBack() {
    this.slideNumber = 1;
  }

  ionViewWillEnter() {
    this.slides.slideTo(0);
    this.pauseAudio();
    this.presentAlertConfirm();
  }

  //Move to Next slide
  slideNext(object, slideView) {
    slideView.slideNext(5000).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }

  //Move to previous slide
  slidePrev(object, slideView) {
    slideView.slidePrev(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }

  //Method called when slide is changed by drag or navigation
  SlideDidChange(object, slideView) {
    this.checkIfNavDisabled(object, slideView);
  }

  //Call methods to check if slide is first or last to enable disbale navigation
  checkIfNavDisabled(object, slideView) {
    this.checkisBeginning(object, slideView);
    this.checkisEnd(object, slideView);
  }

  checkisBeginning(object, slideView) {
    slideView.isBeginning().then((istrue) => {
      object.isBeginningSlide = istrue;
    });
  }
  checkisEnd(object, slideView) {
    slideView.isEnd().then((istrue) => {
      object.isEndSlide = istrue;
    });
  }
}

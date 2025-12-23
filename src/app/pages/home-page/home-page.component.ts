import {
  Component,
  AfterViewInit,
  Renderer2,
  ViewChildren,
  QueryList,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'home',
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('word') words!: QueryList<ElementRef>;
  wordArray: HTMLElement[][] = [];
  currentWord = 0;
  intervalId!: any;
  isBrowser: boolean;

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId); // Check if running in the browser
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return; // Skip DOM manipulation if not in browser

    const wordElements = this.words.toArray().map((el) => el.nativeElement);

    if (!wordElements.length) {
      console.error('No words available in the template.');
      return;
    }

    // Set the opacity of the first word
    this.renderer.setStyle(wordElements[this.currentWord], 'opacity', '1');

    // Split letters for each word
    wordElements.forEach((word) => this.splitLetters(word));

    // Start the word change animation
    if (this.wordArray.length) {
      this.changeWord();
      this.intervalId = setInterval(() => this.changeWord(), 4000);
    }
  }

  splitLetters(word: HTMLElement): void {
    const content = word.innerHTML.trim();
    if (!content) {
      console.warn('Skipping empty word.');
      return;
    }
    word.innerHTML = ''; // Clear the word content
    const fragment = document.createDocumentFragment();
    const letters: HTMLElement[] = [];

    for (let i = 0; i < content.length; i++) {
      const letter = this.renderer.createElement('span');
      this.renderer.addClass(letter, 'letter');
      letter.innerHTML = content.charAt(i);
      fragment.appendChild(letter);
      letters.push(letter);
    }

    word.appendChild(fragment);
    this.wordArray.push(letters);
  }

  changeWord(): void {
    if (!this.wordArray.length) {
      console.error('Word array is empty.');
      return;
    }

    const cw = this.wordArray[this.currentWord];
    const nw =
      this.currentWord === this.wordArray.length - 1
        ? this.wordArray[0]
        : this.wordArray[this.currentWord + 1];

    // Animate letters out
    cw.forEach((letter, i) => this.animateLetterOut(letter, i));

    // Animate letters in
    nw.forEach((letter, i) => {
      this.renderer.addClass(letter, 'behind');
      this.renderer.setStyle(letter.parentElement, 'opacity', '1');
      this.animateLetterIn(letter, i);
    });

    this.currentWord =
      this.currentWord === this.wordArray.length - 1 ? 0 : this.currentWord + 1;
  }

  animateLetterOut(letter: HTMLElement, i: number): void {
    setTimeout(() => {
      this.renderer.removeClass(letter, 'in');
      this.renderer.addClass(letter, 'out');
    }, i * 80);
  }

  animateLetterIn(letter: HTMLElement, i: number): void {
    setTimeout(() => {
      this.renderer.removeClass(letter, 'behind');
      this.renderer.addClass(letter, 'in');
    }, 340 + i * 80);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}

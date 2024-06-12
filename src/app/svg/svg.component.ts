import { Component, ElementRef, Renderer2 } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

// Define the SvgFile interface
interface SvgFile {
  name: string;
  content: string;
}

@Component({
  selector: 'app-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.css']
})
export class SvgComponent {
  svgs: SvgFile[] = [];
  selectedSvgs: SvgFile[] = [];
  private svgContent: SafeHtml;
  private selectedElement: any = null;
  private offset = { x: 0, y: 0 };

  constructor(private elRef: ElementRef, private sanitizer: DomSanitizer, private renderer: Renderer2) {
    this.svgContent = this.sanitizer.bypassSecurityTrustHtml(`
      <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <style>
          .angle-line {
            stroke: rgb(255, 153, 153);
            stroke-width: 2;
            cursor: pointer;
          }
          .angle-text {
            font-size: 12px;
            fill: rgb(255, 153, 153);
          }
        </style>
        <line id="line1" x1="100" y1="100" x2="150" y2="50" class="angle-line" />
        <line id="line2" x1="100" y1="100" x2="150" y2="150" class="angle-line" />
        <text id="angle-text" x="105" y="95" class="angle-text">90°</text>
      </svg>
    `);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      for (const file of Array.from(input.files)) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          const svgContent = e.target?.result as string;
          this.svgs.push({ name: file.name, content: svgContent });
        };
        reader.readAsText(file);
      }
    }
  }

  addSvg(svg: SvgFile): void {
    if (!this.selectedSvgs.includes(svg)) {
      this.selectedSvgs.push(svg);
      setTimeout(() => {
        this.loadSvgs();
      }, 0);
    }
  }

  removeSvg(svg: SvgFile): void {
    const index = this.selectedSvgs.indexOf(svg);
    if (index > -1) {
      this.selectedSvgs.splice(index, 1);
      setTimeout(() => {
        this.loadSvgs();
      }, 0);
    }
  }

  loadSvgs(): void {
    const svgContainer = this.elRef.nativeElement.querySelector('.svg-edit-box');
    svgContainer.innerHTML = '';
    this.selectedSvgs.forEach((svg) => {
      const div = document.createElement('div');
      div.innerHTML = svg.content;
      div.setAttribute('data-name', svg.name);
      svgContainer.appendChild(div.firstChild!);
    });

    const svgs = svgContainer.querySelectorAll('svg');
    svgs.forEach((svgElement: SVGSVGElement) => {
      this.makeElementsDraggable(svgElement);
    });
  }

  ngAfterViewInit() {
    this.attachSvgEvents();
  }

  attachSvgEvents(): void {
    const svgElement = this.elRef.nativeElement.querySelector('svg');
    this.renderer.listen(svgElement, 'mousedown', (evt) => this.startDrag(evt));
    this.renderer.listen(svgElement, 'mousemove', (evt) => this.drag(evt));
    this.renderer.listen(svgElement, 'mouseup', () => this.endDrag());
  }

  startDrag(evt: MouseEvent): void {
    const target = evt.target as SVGElement;
    if (target.classList.contains('angle-line')) {
      this.selectedElement = target;
      const offset = this.getMousePosition(evt);
      this.offset.x = offset.x - parseFloat(target.getAttribute('x2')!);
      this.offset.y = offset.y - parseFloat(target.getAttribute('y2')!);
    }
  }

  drag(evt: MouseEvent): void {
    if (this.selectedElement) {
      evt.preventDefault();
      const coord = this.getMousePosition(evt);
      this.selectedElement.setAttribute('x2', (coord.x - this.offset.x).toString());
      this.selectedElement.setAttribute('y2', (coord.y - this.offset.y).toString());
      this.updateAngleText();
    }
  }

  endDrag(): void {
    this.selectedElement = null;
  }

  getMousePosition(evt: MouseEvent): { x: number, y: number } {
    const svg = this.elRef.nativeElement.querySelector('svg');
    const CTM = svg.getScreenCTM()!;
    return {
      x: (evt.clientX - CTM.e) / CTM.a,
      y: (evt.clientY - CTM.f) / CTM.d
    };
  }

  updateAngleText(): void {
    const line1 = this.elRef.nativeElement.querySelector('#line1');
    const line2 = this.elRef.nativeElement.querySelector('#line2');
    const x1 = parseFloat(line1.getAttribute('x2'));
    const y1 = parseFloat(line1.getAttribute('y2'));
    const x2 = parseFloat(line2.getAttribute('x2'));
    const y2 = parseFloat(line2.getAttribute('y2'));

    const angle = Math.atan2(y2 - 100, x2 - 100) - Math.atan2(y1 - 100, x1 - 100);
    const angleDegrees = Math.abs(angle * 180 / Math.PI).toFixed(2);

    const angleText = this.elRef.nativeElement.querySelector('#angle-text');
    angleText.textContent = angleDegrees + '°';
  }

  makeElementsDraggable(svgElement: SVGSVGElement): void {
    this.renderer.listen(svgElement, 'mousedown', (evt) => this.startDrag(evt));
    this.renderer.listen(svgElement, 'mousemove', (evt) => this.drag(evt));
    this.renderer.listen(svgElement, 'mouseup', () => this.endDrag());
  }
}

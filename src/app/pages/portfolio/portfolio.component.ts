import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent {
  projects = [
    {
      title: 'Allstar Solution LTD',
      link: 'https://allstar.com.np/',
      image: 'assets/images/portfolio/allstar.png',
    },
    {
      title: 'Seirim',
      link: 'https://seirim.com/',
      image: 'assets/images/portfolio/seirim.png',
    },
    {
      title: 'SAIM College',
      link: 'https://www.saim.edu.np/',
      image: 'assets/images/portfolio/saim.png',
    },
    {
      title: 'Six Sigma Education',
      link: 'https://sixsigmaedu.com.np/',
      image: 'assets/images/portfolio/sixsigma.png',
    },
    {
      title: 'Allstar EMS',
      link: 'https://allstarems.com/ems/register',
      image: 'assets/images/portfolio/ems.png',
    },
    {
      title: 'Rising Star school/college',
      link: 'https://school.risingstar.edu.np/',
      image: 'assets/images/portfolio/risingstar.png',
    },
    {
      title: 'The excel public school',
      link: 'https://excelschool.edu.np/',
      image: 'assets/images/portfolio/excel.png',
    },
    {
      title: 'Santi Foundation',
      link: 'https://www.shantifoundation.org.np/',
      image: 'assets/images/portfolio/santifoun.png',
    },
    {
      title: 'Care School',
      link: 'https://careschool.edu.np/',
      image: 'assets/images/portfolio/care.jpg',
    },
    {
      title: 'xybernova',
      link: 'https://github.com/RahimGopali1/XyberNova.git',
      image: 'assets/images/portfolio/xybernova.png',
    },
    {
      title: 'Gunraj nursing college',
      link: 'https://github.com/RahimGopali1/Gunraj-College.git',
      image: 'assets/images/portfolio/gunraj.png',
    },
  ];
}

import { Component } from '@angular/core';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { Register } from '../../pages/register/register';

@Component({
  selector: 'app-main-layout',
  imports: [Header, Footer, Register],
  templateUrl: './main-layout.html',
})
export class MainLayout { }

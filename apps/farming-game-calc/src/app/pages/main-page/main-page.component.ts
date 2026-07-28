import { Component } from '@angular/core';
import { faGear, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { SettingsService } from '../../settings/settings.service';

@Component({
  selector: 'app-main-page',
  standalone: false,
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  faSettingsIcon: IconDefinition = faGear;
  totalAmount = 0;
  hayAmount = 0;
  grainAmount = 0;
  fruitAmount = 0;
  cowAmount = 0;
  tractorAmount = 0;
  harvesterAmount = 0;
  cashAmount = 0;
  debtAmount = 0;
  // ngModel variables
  hayAcres = 10;
  grainAcres = 10;
  fruitAcres: number | null = null;
  numberOfCows: number | null = null;
  cashInHand: string | null = null;
  debt: string | null = null;
  hasTractor = false;
  hasHarvesterValue = false;

  constructor(private readonly settingsService: SettingsService) {
    this.recalculateFromCurrentValues();
    this.calculateTotal();
  }

  hayAcresChanged(input: number) {
    this.hayAcres = input;
    this.hayAmount = input * this.settingsService.getSettings().hayPricePerAcre;
    this.calculateTotal();
  }

  grainAcresChanged(input: number) {
    this.grainAcres = input;
    this.grainAmount =
      input * this.settingsService.getSettings().grainPricePerAcre;
    this.calculateTotal();
  }

  fruitAcresChanged(input: number) {
    this.fruitAcres = input;
    this.fruitAmount =
      input * this.settingsService.getSettings().fruitPricePerAcre;
    this.calculateTotal();
  }

  cowsChanged(input: number) {
    this.numberOfCows = input;
    this.cowAmount = input * this.settingsService.getSettings().cowPrice;
    this.calculateTotal();
  }

  tractorChanged(checked: boolean) {
    this.hasTractor = checked;
    this.tractorAmount = checked
      ? this.settingsService.getSettings().tractorPrice
      : 0;
    this.calculateTotal();
  }

  harvesterChanged(checked: boolean) {
    this.hasHarvesterValue = checked;
    this.harvesterAmount = checked
      ? this.settingsService.getSettings().harvesterPrice
      : 0;
    this.calculateTotal();
  }

  cashChanged(cash: string | number) {
    this.cashInHand = String(cash);
    const cashInt = Number(cash) || 0;
    this.cashAmount = cashInt;
    this.calculateTotal();
  }

  debtChanged(debt: string | number) {
    let debtInt = Number(debt) || 0;
    // If a negative value is entered, just make it positive. We subtract it later
    if (debtInt < 0) {
      debtInt = debtInt * -1;
    }
    this.debtAmount = debtInt;
    this.debt = String(debt);
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalAmount =
      this.hayAmount +
      this.grainAmount +
      this.fruitAmount +
      this.cowAmount +
      this.harvesterAmount +
      this.tractorAmount +
      this.cashAmount -
      this.debtAmount;
  }

  onResetClicked() {
    this.hayAcres = 10;
    this.grainAcres = 10;
    this.fruitAcres = null;
    this.numberOfCows = null;
    this.cashInHand = null;
    this.debt = null;
    this.hasHarvesterValue = false;
    this.hasTractor = false;
    this.recalculateFromCurrentValues();
    this.cashAmount = 0;
    this.debtAmount = 0;
    this.calculateTotal();
  }

  private recalculateFromCurrentValues() {
    const settings = this.settingsService.getSettings();
    this.hayAmount = this.hayAcres * settings.hayPricePerAcre;
    this.grainAmount = this.grainAcres * settings.grainPricePerAcre;
    this.fruitAmount = (this.fruitAcres || 0) * settings.fruitPricePerAcre;
    this.cowAmount = (this.numberOfCows || 0) * settings.cowPrice;
    this.tractorAmount = this.hasTractor ? settings.tractorPrice : 0;
    this.harvesterAmount = this.hasHarvesterValue ? settings.harvesterPrice : 0;
  }
}

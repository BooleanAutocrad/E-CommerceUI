import { Component } from '@angular/core';
import { CategoryIdAndName } from 'src/app/models/category/category';
import { CategoryService } from 'src/app/service/category-service/category.service';
import { ProductFilterService } from 'src/app/shared/sharedService/sharedProductFilterService/product-filter.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent {
  categories: CategoryIdAndName[] = [];
  selectedCategoryId: number | null = null;
  constructor(
    private categoryService: CategoryService,
    private productFilterService: ProductFilterService
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      (data: CategoryIdAndName[]) => {
        this.categories = data;
        this.checkIfAlreadySelected();
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
  }

  checkIfAlreadySelected() {
    const filterState = this.productFilterService.filterStateSubject.getValue();

    const categoryId = filterState.categoryId;
    if (categoryId !== null) {
      const category = this.categories.find(
        (cat) => cat.categoryId === categoryId
      );
      if (category) {
        category.selected = true;
        this.selectedCategoryId = categoryId;
      }
    }
  }

  selectCategory(category: CategoryIdAndName): void {
    if (category.categoryId === this.selectedCategoryId) {
      category.selected = false;
      this.selectedCategoryId = null;
      this.applyCategoryToProduct(null);
    } else {
      if (this.selectedCategoryId !== null) {
        const prevSelectedCategory = this.categories.find(
          (cat) => cat.categoryId === this.selectedCategoryId
        );
        if (prevSelectedCategory) {
          prevSelectedCategory.selected = false;
        }
      }

      category.selected = !category.selected;

      this.selectedCategoryId = category.selected ? category.categoryId : null;

      if (category.selected) {
        this.applyCategoryToProduct(category.categoryId);
      } else {
        this.applyCategoryToProduct(null);
      }
    }
  }

  applyCategoryToProduct(categoryId: any): void {
    this.productFilterService.changeCategory(categoryId);
  }
}

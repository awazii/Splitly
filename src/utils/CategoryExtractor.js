import {Groupcategories} from '../pages/Group/Grouplist';
export function CategoryExtrator(group) {
    const category = Groupcategories.find(category => category.id === group.Category);
    return category ;
  }
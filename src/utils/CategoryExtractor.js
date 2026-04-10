import {Groupcategories} from '../Components/Groups/Grouplist';
export function CategoryExtrator(group) {
    const category = Groupcategories.find(category => category.id === group.Category);
    return category ;
  }
export interface IExpense {
	_id?: string;
	title: string;
	amount: number;
	category: ExpenseCategoryEnum;
	date: Date;
}

export enum ExpenseCategoryEnum {
	Food = 'Food',
	Transportation = 'Transportation',
	Rent = 'Rent',
	Utilities = 'Utilities',
	Entertainment = 'Entertainment',
	Health = 'Health',
	Clothing = 'Clothing',
	Education = 'Education',
	Insurance = 'Insurance',
	Gifts = 'Gifts',
	Travel = 'Travel',
	PersonalCare = 'Personal Care',
	Miscellaneous = 'Miscellaneous',
	Work = 'Work',
}

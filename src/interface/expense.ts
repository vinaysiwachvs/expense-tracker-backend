import mongoose from 'mongoose';

export interface IExpense {
	_id?: string | mongoose.Types.ObjectId;
	name: string;
	amount: number;
	category: ExpenseCategoryEnum;
	created_by: string;
	created_at?: Date;
	updated_by: string;
	updated_at?: Date;
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

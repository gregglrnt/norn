import { goto } from '$app/navigation'

// export const navigateDate = (value: string) => {
// 	console.log(`goto : ${value}`);
// 	return `/${value}
// }

export const increaseDate = (currentDate: number, value: 1 | -1) => {
	goto(`/${currentDate + value}`)
}

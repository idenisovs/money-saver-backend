export default interface Password {
	current: string;
	primary: string;
	confirm: string;
	hash: string;
}
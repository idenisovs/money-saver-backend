export default function serialize(user: any, done: (err: any, userId?: number) => void) {
    done(null, user.id);
}
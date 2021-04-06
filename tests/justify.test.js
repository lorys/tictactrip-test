const justify = require("../src/justifyText");

const texts = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis magna sodales lobortis aliquet. Donec id urna venenatis sapien rutrum imperdiet. Aenean tempus imperdiet risus vel vulputate. Integer ut interdum elit. Cras ipsum massa, aliquet ac egestas ut, luctus non purus. Vivamus vel malesuada dolor. Suspendisse nunc magna, fringilla vel erat ut, porta feugiat libero. Nullam mollis ut arcu suscipit cursus. Nulla pulvinar, augue vitae viverra blandit, metus urna ornare justo, luctus accumsan ante mauris ut lorem. Integer ut pellentesque lorem, ut aliquam nisl. Duis semper ultrices nulla, sed vehicula lacus egestas sit amet. Donec a sapien a lorem pharetra sodales nec eget ex.",
];

test('no line longer than 80', () => {
    const lines = justify(texts[0]).split("\n");
    lines.forEach((line) => {
        expect(line.length).toBeLessThanOrEqual(80);
    });
});
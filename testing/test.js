(function () {

    const test = require("ava");
    const rubellite = require("../rubellite.min.js");

    var dictionary = null;

    // Init - Empty

    test.serial("init-empty", (t) => {

        dictionary = new rubellite();

        t.pass();
    });

    test.serial("init-empty: count", (t) => {

        t.is(dictionary.count(), 0, "Expected count() to return 0");
    });

    test.serial("init-empty: getKeys", (t) => {

        t.deepEqual(dictionary.getKeys(), [], "Expected getKeys() to return []");
    });

    test.serial("init-empty: getValues", (t) => {

        t.deepEqual(dictionary.getValues(), [], "Expected getValues() to return []");
    });

    test.serial("init-empty: getJson", (t) => {

        t.is(dictionary.getJson(), "{}", "Expected getJson() to return \"{}\"");
    });

    // Init Object

    test.serial("init-object", (t) => {

        dictionary = new rubellite({
            firstProperty: false,
            secondProperty: {
                propx: "abc",
                propy: 123
            }
        });

        t.pass();
    });

    test.serial("init-object: count", (t) => {

        t.is(dictionary.count(), 2, "Expected count() to return 2");
    });

    test.serial("init-object: getKeys", (t) => {

        var expected = ["firstProperty", "secondProperty"];

        t.deepEqual(dictionary.getKeys(), expected, "Expected getKeys() to return " + JSON.stringify(expected));
    });

    test.serial("init-object: getValues", (t) => {

        var expected = [
            false,
            {
                propx: "abc",
                propy: 123
            }
        ];

        t.deepEqual(dictionary.getValues(), expected, "Expected getValues() to return " + JSON.stringify(expected));
    });

    test.serial("init-object: getJson", (t) => {

        var expected = JSON.stringify({
            firstProperty: false,
            secondProperty: {
                propx: "abc",
                propy: 123
            }
        });

        t.is(dictionary.getJson(), expected, "Expected getJson() to return " + expected);
    });

    // Add

    test.serial("add", (t) => {

        dictionary.add("thirdProperty", 50);

        t.pass();
    });

    test.serial("add: invalid-key", (t) => {

        try {

            dictionary.add(1234, 5678);
        }
        catch (e) { t.pass(); }
    });

    test.serial("add: count", (t) => {

        t.is(dictionary.count(), 3, "Expected count() to return 3");
    });

    test.serial("add: getKeys", (t) => {

        var expected = ["firstProperty", "secondProperty", "thirdProperty"];

        t.deepEqual(dictionary.getKeys(), expected, "Expected getKeys() to return " + JSON.stringify(expected));
    });

    test.serial("add: getValues", (t) => {

        var expected = [
            false,
            {
                propx: "abc",
                propy: 123
            },
            50
        ];

        t.deepEqual(dictionary.getValues(), expected, "Expected getValues() to return " + JSON.stringify(expected));
    });

    test.serial("add: getJson", (t) => {

        var expected = JSON.stringify({
            firstProperty: false,
            secondProperty: {
                propx: "abc",
                propy: 123
            },
            thirdProperty: 50
        });

        t.is(dictionary.getJson(), expected, "Expected getJson() to return " + expected);
    });

    // Replace

    test.serial("replace", (t) => {

        dictionary.replace("thirdProperty", 55);

        dictionary.replace("secondProperty", {
            propx: "abcd",
            propy: 1234
        });

        dictionary.replace("fourthProperty", "hello");

        t.pass();
    });

    test.serial("replace: invalid-key", (t) => {

        try {

            dictionary.replace(undefined, true);
        }
        catch (e) { t.pass(); }
    });

    test.serial("replace: count", (t) => {

        t.is(dictionary.count(), 4, "Expected count() to return 4");
    });

    test.serial("replace: getKeys", (t) => {

        var expected = ["firstProperty", "secondProperty", "thirdProperty", "fourthProperty"];

        t.deepEqual(dictionary.getKeys(), expected, "Expected getKeys() to return " + JSON.stringify(expected));
    });

    test.serial("replace: getValues", (t) => {

        var expected = [
            false,
            {
                propx: "abcd",
                propy: 1234
            },
            55,
            "hello"
        ];

        t.deepEqual(dictionary.getValues(), expected, "Expected getValues() to return " + JSON.stringify(expected));
    });

    test.serial("replace: getJson", (t) => {

        var expected = JSON.stringify({
            firstProperty: false,
            secondProperty: {
                propx: "abcd",
                propy: 1234
            },
            thirdProperty: 55,
            fourthProperty: "hello"
        });

        t.is(dictionary.getJson(), expected, "Expected getJson() to return " + expected);
    });

    // Feed

    test.serial("feed", (t) => {

        dictionary.feed({
            fourthProperty: "hello-changed",
            fifthProperty: 789
        });

        t.pass();
    });

    test.serial("feed: preserve", (t) => {

        dictionary.feed({
            fourthProperty: "hello-changed-2",
            fifthProperty: 1,
            sixthProperty: "sixthProperty"
        }, true);

        t.pass();
    });

    test.serial("feed: count", (t) => {

        t.is(dictionary.count(), 6, "Expected count() to return 6");
    });

    test.serial("feed: getKeys", (t) => {

        var expected = ["firstProperty", "secondProperty", "thirdProperty", "fourthProperty", "fifthProperty", "sixthProperty"];

        t.deepEqual(dictionary.getKeys(), expected, "Expected getKeys() to return " + JSON.stringify(expected));
    });

    test.serial("feed: getValues", (t) => {

        var expected = [
            false,
            {
                propx: "abcd",
                propy: 1234
            },
            55,
            "hello-changed",
            789,
            "sixthProperty"
        ];

        t.deepEqual(dictionary.getValues(), expected, "Expected getValues() to return " + JSON.stringify(expected));
    });

    test.serial("feed: getJson", (t) => {

        var expected = JSON.stringify({
            firstProperty: false,
            secondProperty: {
                propx: "abcd",
                propy: 1234
            },
            thirdProperty: 55,
            fourthProperty: "hello-changed",
            fifthProperty: 789,
            sixthProperty: "sixthProperty"
        });

        t.is(dictionary.getJson(), expected, "Expected getJson() to return " + expected);
    });

    // Contains Key

    test.serial("containsKey: exists", (t) => {

        t.is(dictionary.containsKey("firstProperty"), true, "Expected containsKey() to return true");
    });

    test.serial("containsKey: not-exists", (t) => {

        t.is(dictionary.containsKey("123"), false, "Expected containsKey() to return false");
    });

    // Seek

    test.serial("seek: exists", (t) => {

        t.is(dictionary.seek("firstProperty"), false, "Expected containsKey() to return false");
    });

    test.serial("seek: not-exists", (t) => {

        t.is(dictionary.seek("123"), undefined, "Expected containsKey() to return false");
    });

    // Remove

    test.serial("remove", (t) => {

        dictionary.remove("thirdProperty");

        t.pass();
    });

    test.serial("remove: not-exists", (t) => {

        dictionary.remove(undefined);

        dictionary.remove("tenthProperty");

        t.pass();
    });

    test.serial("remove: count", (t) => {

        t.is(dictionary.count(), 5, "Expected count() to return 5");
    });

    test.serial("remove: getKeys", (t) => {

        var expected = ["firstProperty", "secondProperty", "fourthProperty", "fifthProperty", "sixthProperty"];

        t.deepEqual(dictionary.getKeys(), expected, "Expected getKeys() to return " + JSON.stringify(expected));
    });

    test.serial("remove: getValues", (t) => {

        var expected = [
            false,
            {
                propx: "abcd",
                propy: 1234
            },
            "hello-changed",
            789,
            "sixthProperty"
        ];

        t.deepEqual(dictionary.getValues(), expected, "Expected getValues() to return " + JSON.stringify(expected));
    });

    test.serial("remove: getJson", (t) => {

        var expected = JSON.stringify({
            firstProperty: false,
            secondProperty: {
                propx: "abcd",
                propy: 1234
            },
            fourthProperty: "hello-changed",
            fifthProperty: 789,
            sixthProperty: "sixthProperty"
        });

        t.is(dictionary.getJson(), expected, "Expected getJson() to return " + expected);
    });

    // Recycle

    var functionProperty = function () { return 0; };

    test.serial("recycle", (t) => {

        dictionary.recycle({
            propa: "a",
            propb: undefined,
            propc: functionProperty
        });

        t.pass();
    });

    test.serial("recycle: count", (t) => {

        t.is(dictionary.count(), 3, "Expected count() to return 3");
    });

    test.serial("recycle: getKeys", (t) => {

        var expected = ["propa", "propb", "propc"];

        t.deepEqual(dictionary.getKeys(), expected, "Expected getKeys() to return " + JSON.stringify(expected));
    });

    test.serial("recycle: getValues", (t) => {

        var expected = [
            "a",
            undefined,
            functionProperty
        ];

        t.deepEqual(dictionary.getValues(), expected, "Expected getValues() to return " + JSON.stringify(expected));
    });

    test.serial("recycle: getJson", (t) => {

        var expected = JSON.stringify({
            propa: "a",
            propb: undefined,
            function() { return 0; }
        });

        t.is(dictionary.getJson(), expected, "Expected getJson() to return " + expected);
    });

    // Mutate

    test.serial("mutate", (t) => {

        dictionary.recycle({
            propa: {
                firstProperty: "prop1",
                secondProperty: 123
            },
            propb: 123,
            propc: "hello",
            propd: undefined
        });

        var pa = dictionary.seek("propa");
        pa.firstProperty = "firstProperty";
        pa.secondProperty = 789;

        var pb = dictionary.seek("propb");
        pb = 456;

        var pc = dictionary.seek("propc");
        pc = "hello-world";

        var pd = dictionary.seek("propd");
        pd = {
            a: "a",
            b: "b"
        };

        t.pass();
    });

    test.serial("mutate: count", (t) => {

        t.is(dictionary.count(), 4, "Expected count() to return 4");
    });

    test.serial("mutate: getKeys", (t) => {

        var expected = ["propa", "propb", "propc", "propd"];

        t.deepEqual(dictionary.getKeys(), expected, "Expected getKeys() to return " + JSON.stringify(expected));
    });

    test.serial("mutate: getValues", (t) => {

        var expected = [
            {
                firstProperty: "firstProperty",
                secondProperty: 789
            },
            123,
            "hello",
            undefined
        ];

        t.deepEqual(dictionary.getValues(), expected, "Expected getValues() to return " + JSON.stringify(expected));
    });

    test.serial("mutate: getJson", (t) => {

        var expected = JSON.stringify({
            propa: {
                firstProperty: "firstProperty",
                secondProperty: 789
            },
            propb: 123,
            propc: "hello",
            propd: undefined
        });

        t.is(dictionary.getJson(), expected, "Expected getJson() to return " + expected);
    });

    // Clear

    test.serial("clear", (t) => {

        dictionary.clear();

        t.pass();
    });

    test.serial("clear: count", (t) => {

        t.is(dictionary.count(), 0, "Expected count() to return 0");
    });

    test.serial("clear: getKeys", (t) => {

        t.deepEqual(dictionary.getKeys(), [], "Expected getKeys() to return []");
    });

    test.serial("clear: getValues", (t) => {

        t.deepEqual(dictionary.getValues(), [], "Expected getValues() to return []");
    });

    test.serial("clear: getJson", (t) => {

        t.is(dictionary.getJson(), "{}", "Expected getJson() to return \"{}\"");
    });

    // Proto

    test.serial("proto", (t) => {

        var testObject = {};

        dictionary = new rubellite({
            propa: 123,
            __proto__: testObject.__proto__
        });

        t.pass();
    });

    test.serial("proto: count", (t) => {

        t.is(dictionary.count(), 1, "Expected count() to return 1");
    });

    test.serial("proto: getKeys", (t) => {

        var expected = ["propa"];

        t.deepEqual(dictionary.getKeys(), expected, "Expected getKeys() to return " + JSON.stringify(expected));
    });

    test.serial("proto: getValues", (t) => {

        var expected = [123];

        t.deepEqual(dictionary.getValues(), expected, "Expected getValues() to return " + JSON.stringify(expected));
    });

    test.serial("proto: getJson", (t) => {

        var expected = JSON.stringify({
            propa: 123
        });

        t.is(dictionary.getJson(), expected, "Expected getJson() to return " + expected);
    });

}());
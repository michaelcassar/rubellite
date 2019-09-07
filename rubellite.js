(function() {

    function Rubellite(o) {

        var context = this;

        var data = Object.create(null);
        var count = 0;

        var isString = function(x) {
            return Object.prototype.toString.call(x) === "[object String]";
        };

        var isFunction = function(x) {
            return Object.prototype.toString.call(x) === "[object Function]";
        };
        
        var isObject = function(x) {
            return x === Object(x);
        };

        var isValidKey = function(key) {
            return isString(key) && Boolean(key);
        };

        var objectValues = function(obj) {

            if (Boolean(Object.values) && isFunction(Object.values)) {
                return Object.values(obj);
            }

            return Object.keys(obj).map(function(x) { 
                return obj[x];
            });
        };

        var objectAssign = function(target, obj, preserve) {

            var overwrite = !Boolean(preserve);

            if (Boolean(Object.assign) && isFunction(Object.assign) && overwrite) {
                Object.assign(target, obj);
                return;
            }

            for (key in obj) {

                if (!obj.hasOwnProperty(key) || (!overwrite && key in target)) { continue; }

                target[key] = obj[key];
            }
        };

        var removeProto = function(obj) {

            var target = Object.create(null);

            objectAssign(target, obj);

            return target;
        };

        var insert = function(key, value, overwrite) {

            if (!isValidKey(key)) {
                throw Error("ERR_RUBELLITE_001: Invalid key");
            }

            if (key in data && !overwrite) {
                throw Error("ERR_RUBELLITE_002: Key already exists");
            }
            
            if (!(key in data)) {
                count++;
            }

            data[key] = value;
        };

        var initialize = function(obj) {
            data = Boolean(obj) && isObject(obj) ? removeProto(obj) : Object.create(null);
            count = Object.keys(data).length;
        };

        initialize(o);

        context.count = function() {

            return count;
        };

        context.add = function(key, value) {

            insert(key, value);
        };

        context.replace = function(key, value) {

            insert(key, value, true);
        };

        context.feed = function(obj, preserve) {

            if (!Boolean(obj) || !isObject(obj)) { return; }

            objectAssign(data, obj, preserve);

            count = Object.keys(data).length;
        };

        context.containsKey = function(key) {

            if (!isValidKey(key)) { return false; }

            return key in data;
        };

        context.seek = function(key) {

            if (!isValidKey(key)) { return undefined; }

            return data[key];
        };

        context.remove = function(key) {

            if (!isValidKey(key) || !(key in data)) { return; }

            delete data[key];
            count--;
        };

        context.getKeys = function() {

            return Object.keys(data);
        };

        context.getValues = function() {

            return objectValues(data);
        };

        context.getJson = function() {

            return JSON.stringify(data);
        };

        context.clear = function() {

            initialize();
        };

        context.recycle = function(obj) {

            initialize(obj);
        };
    }

    module.exports = Rubellite;

}());

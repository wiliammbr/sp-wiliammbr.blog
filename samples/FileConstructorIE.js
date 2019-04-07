
// Initializes all the properties for the file object
var args = {
    fileName: 'filename.txt',
    text: 'This is the file content',
    type: 'text/plain',
    lastModified: Date.now(),
    lastModifiedDate: new Date()
};

// Mock lib uploader service for demonstration purposes
var OtherFileUploader = function () {
    var files = [];
    return {
        addToQueue: function (newFiles) {
            if (newFiles && newFiles.length > 0) {
                Array.prototype.push.apply(files, newFiles);
            }
            return true;
        },
        countFiles: function () {
            return files ? files.length : 0;
        },
        uploadFiles: function () {
            files = [];
            return true;
        },
        clearQueue: function () {
            files = [];
        }
    }
}

// Starts the test
var fileUploader = OtherFileUploader();
var file = null;

try {
    // Creates the object as usual
    file = new File([args.text], args.fileName, { lastModified: args.lastModified, type: args.type });
    // Adds it to the Queue
    fileUploader.addToQueue([file]);
} catch (e) {
    // logs that some went unexpected, probably IE
    console.log('No file constructor, trying to convert from Blob to File');
    // this is polyfill that can help you if there's no support for Object assign
    if (typeof Object.assign != 'function') {
        Object.assign = function (target) {
            'use strict';
            if (target == null) {
                throw new TypeError('Cannot convert undefined or null to object');
            }

            target = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var source = arguments[index];
                if (source != null) {
                    for (var key in source) {
                        if (Object.prototype.hasOwnProperty.call(source, key)) {
                            target[key] = source[key];
                        }
                    }
                }
            }
            return target;
        };
    }
    // Create the blob file with the same properties
    var blob = new Blob([args.text], { type: args.type });
    blob['fileName'] = args.fileName;
    blob['lastModifiedDate'] = args.lastModifiedDate;

    // if in TypeScript, ensure that you are passing the cast
    // file = <File>Object.assign(blob, { lastModified: args.lastModified, type: args.type });

    // Assigns it to the file object
    file = Object.assign(blob, { lastModified: args.lastModified, type: args.type });
    // Uses it in the third-part lib to upload the file
    fileUploader.addToQueue([file]);
}

// Prints how many files the lib has
console.log('File uploder has ' + fileUploader.countFiles() + ' files');
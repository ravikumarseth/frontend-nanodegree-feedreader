/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('should have a defined URl', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(
                    0);
            }
        });
        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('should have a defined name', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(
                    0);
            }
        });
    });
    /* A new test suite named "The menu" */
    describe('The Menu', function() {
        /* A test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            expect($("body").hasClass("menu-hidden")).toBe(
                true);
        });
        /* A test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        describe('when clicked', function() {
            // Checking if body has "menu-hidden" class or not
            it('should display the menu', function() {
                $('.menu-icon-link').trigger(
                    "click");
                expect($("body").hasClass(
                    "menu-hidden")).toBe(
                    false);
            });
            it('again should hide the menu', function() {
                $('.menu-icon-link').trigger(
                    "click");
                expect($("body").hasClass(
                    "menu-hidden")).toBe(
                    true);
            });
        });
    });
    /* A new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        var entriesLength = [];
        // Changing default Timeout Interval of Jasmine from 5 secs to 20 secs
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        beforeEach(function(done) {
            let i = 0;

            function getEntries() {
                let entry = $('.feed').find('.entry');
                entriesLength.push(entry.length);
            }
            // Getting the number of entries for each news feed 
            function cb() {
                if (i < allFeeds.length) {
                    getEntries();
                    i++;
                    if (i === (allFeeds.length - 1)) {
                        loadFeed(i, function() {
                            getEntries();
                            done();
                        });
                    } else {
                        loadFeed(i, cb);
                    }
                }
            }
            loadFeed(i, cb);
        });
        it('should have at least a single entry', function(done) {
            for (let i = 0; i < entriesLength.length; i++) {
                expect(entriesLength[i]).toBeGreaterThan(
                    0);
            }
            expect(entriesLength.length).not.toBe(0);
            done();
        });
    });
    /* A new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var feeds = [];
        beforeEach(function(done) {
            let i = 0;

            function getEntries() {
                let entry = $('.feed').find('.entry');
                feeds.push(entry.eq(0).text().trim());
            }
            // Getting text of first entry of each feed
            function cb() {
                if (i < allFeeds.length) {
                    getEntries();
                    i++;
                    if (i === (allFeeds.length - 1)) {
                        loadFeed(i, function() {
                            getEntries();
                            done();
                        });
                    } else {
                        loadFeed(i, cb);
                    }
                }
            }
            loadFeed(i, cb);
        });
        it('should load new feed', function(done) {
            // Testing if new feed is different from previous feed
            // by comparing text of first entry of each feed.
            for (let i = 0; i < feeds.length - 1; i++) {
                for (let j = i + 1; j < allFeeds.length; j++) {
                    expect(feeds[i]).not.toBe(feeds[j]);
                }
            }
            expect(feeds.length).not.toBe(0);
            done();
        });
    });
}());
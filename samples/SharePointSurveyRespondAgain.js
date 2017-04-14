var NewItem2 = (function () {
    var NewItem2Orig = NewItem2;
    return function () {
        var evt = arguments[0];
        var url = arguments[1];

        // loads the sharepoint javascript library
        SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
            // read the answer to check if the current user already responded
            readSurveyVotes(function (id) {
                // if he voted, then opens the edit form
                if (id && id > 0) {
                    url = updateQueryStringParameter(url, 'PageType', 6);
                    url = updateQueryStringParameter(url, 'ID', id);
                    EditItem2(evt, url);
                }
                // if not, just call the original newitem function
                else {
                    NewItem2Orig(evt, url);
                }
            });
        });
    };
})();

function readSurveyVotes(cbSurveyResult) {
    var context = new SP.ClientContext.get_current();
    var web = context.get_web();
    var list = web.get_lists().getById(_spPageContextInfo.pageListId);
    var viewXml = '<View> \
                    <Where> \
                        <Eq> \
                            <FieldRef Name="Author"/> \
                            <Value Type="Integer"><UserID Type="Integer"/></Value> \
                        </Eq> \
                    </Where> \
                   </View>';
    var query = new SP.CamlQuery();
    query.set_viewXml(viewXml);
    var items = list.getItems(query);
    context.load(items);
    context.add_requestSucceeded(onLoaded);
    context.add_requestFailed(onFailure);
    context.executeQueryAsync();
    function onLoaded() {
        var itemId = null;
        var enumerator = items.getEnumerator();
        while (enumerator.moveNext()) {
            var currentItem = enumerator.get_current();
            itemId = currentItem.get_item('ID');
            break;
        }
        cbSurveyResult(itemId);
    }
    function onFailure(e) {
        cbSurveyResult(null);
    }
}

function updateQueryStringParameter(uri, key, value) {
    var re = new RegExp("([?&])" + key + "=.*?(&|#|$)", "i");
    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + "=" + value + '$2');
    } else {
        var hash = '';
        if (uri.indexOf('#') !== -1) {
            hash = uri.replace(/.*#/, '#');
            uri = uri.replace(/#.*/, '');
        }
        var separator = uri.indexOf('?') !== -1 ? "&" : "?";
        return uri + separator + key + "=" + value + hash;
    }
}
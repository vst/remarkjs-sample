$(document).ready(function (x) {
    var slideshow = null;

    if (window.remark) {
        slideshow = remark.create();
    }
    else {
        alert("Slideshow cannot be loded: Check remarkjs.");
    }

    function data_t2t_aux (element) {
        var code = element.innerText.trim();
        var class_ = $(element).attr("class");
        if (class_) {
            class_ = " " + class_;
        }
        else {
            class_ = "";
        }
        var rows = code.split("\n").map(function(x) {return x.split("|")});
        var header = rows.reverse().pop();
        rows.reverse();
        var retval = "<table class='table" + class_ + "'><tr>" + "<th>" + header.join("</th><th>") + "</th>" + "</tr><tr>" + rows.map(function (x) {return "<td>" + x.join("</td><td>") + "</td>"; }).join("</tr><tr>") + "</tr></table>";
        var retElement = $(retval);
        var alignment = new Object;
        alignment["l"] = "left";
        alignment["c"] = "center";
        alignment["r"] = "right";
        var cells = retElement.find("td,th");
        cells.each(function () {
            var content = $(this).html().trim();
            if (content.substr(0, 1) == "@" && content.substr(2, 1) == ".") {
                $(this).html(content.substr(3, content.length).trim()).attr("align", alignment[content.substr(1, 1)]);
            }
        });
        return retElement;
    }

    function data_t2t () {
        var elements = $("pre[data-t2t]");
        elements.map(function () {
            $(this).replaceWith(data_t2t_aux(this));
        });
    }

    data_t2t();
});

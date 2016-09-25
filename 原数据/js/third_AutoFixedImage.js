function fixedParent(imgetObj, parentBox, callback) {
    var maxWidth;
    var maxHeight;
    if (parentBox.width != null) {
        maxWidth = parentBox.width;
        maxHeight = parentBox.height;
    } else {
        maxWidth = $(parentBox).width();
        maxHeight = $(parentBox).height();
    }

    var img = new Image();
    img.onload = function () {

        var imgWidth = img.width;
        var imgHeight = img.height;

        var imgScale = imgWidth / imgHeight;
        var parentBoxScale = maxWidth / maxHeight;
        var w, h;
        if (imgScale > 1) {
            w = maxWidth;
            h = (maxWidth / imgScale).toFixed(0);
        }
        else {
            h = maxHeight;
            w = (maxHeight * imgScale).toFixed(0);
        }
        imgetObj.style.width = w + 'px';
        imgetObj.style.height = h + 'px';
        var left = (maxWidth - w) / 2;
        var top = (maxHeight - h) / 2;
        imgetObj.style.marginLeft = left.toFixed(0) + 'px';
        imgetObj.style.marginTop = top.toFixed(0) + 'px';
        if (callback != null) {
            callback(imgetObj.src, { w: w, h: h }, { w: imgWidth, h: imgHeight });
        }
    }
    img.src = imgetObj.src;
}
function faceFail(img) {
    img.src = "../images/Error.png";
}
// 居中
function fixedImage(imgetObj, src, maxWidth, maxHeight, isSetMargin) {
    var img = new Image();
    img.isFirst = true;
    img.onerror = function () {
        if (img.isFirst) {
            img.src = "../../images/t1.jpg";
            img.isFirst = false;
        }
    }
    img.onload = function () {
        img.width = img.naturalWidth;
        img.height = img.naturalHeight;
        var size = { w: img.width, h: img.height };
        var imgWidth = img.width;
        var imgHeight = img.height;
        if (imgWidth > maxWidth || imgHeight > maxHeight) {
            var sw = imgWidth / maxWidth;
            var sh = imgHeight / maxHeight;
            if (sw > sh) {
                size.w = maxWidth;
                size.h = (maxWidth * imgHeight / imgWidth).toFixed(0);
            } else {
                size.w = (maxHeight * imgWidth / imgHeight).toFixed(0);
                size.h = maxHeight;
            }
        }
        var style = imgetObj.style;
        if (isSetMargin) {
            var x = (maxWidth - size.w) / 2
            var y = (maxHeight - size.h) / 2
            style.marginLeft = style.marginRight = "{0}px".format(Math.floor(x));
            style.marginTop = style.marginBottom = "{0}px".format(Math.floor(y));
        }
        style.width = "{0}px".format(size.w);
        style.height = "{0}px".format(size.h);
        imgetObj.src = img.src;
    }
    img.src = src;
}


// 满屏
function fixedImageEx(imgetObj, src, minWidth, minHeight) {
    if (minHeight == null) {
        minWidth = MinSize.w;
        minHeight = MinSize.h;
    }
    var img = new Image();
    img.isFirst = true;
    img.onerror = function () {
        if (img.isFirst) {
            img.src = "/images/Error.png";
            img.isFirst = false;
        }
    }
    img.onload = function () {
        var size = { w: img.width, h: img.height };
        var imgWidth = img.width;
        var imgHeight = img.height;
        if (imgWidth / minWidth > imgHeight / minHeight) { // 图比较宽
            size.h = minHeight;
            size.w = (imgWidth * minHeight / imgHeight).toFixed(0);
        }
        else { // 图比较高
            size.w = minWidth
            size.h = (imgHeight * minWidth / imgWidth).toFixed(0);
        }
        var left = -(size.w - minWidth) / 2;
        var top = -(size.h - minHeight) / 2;
        var style = imgetObj.style;
        style.left = style.marginRight = Math.floor(left) + "px"
        style.top = style.marginBottom = Math.floor(top) + "px";
        style.width = size.w + "px";
        style.height = size.h + "px";
        imgetObj.src = img.src;
    }
    img.src = src;
}

//字符串格式化
String.prototype.format = function () {
    var args = arguments;
    var result = this.replace(/\{(\d+)\}/g, function ($0, $1) { return args[parseInt($1)]; });
    return result;
}
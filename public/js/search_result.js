let iconTooltips = document.querySelectorAll('.item__icon-tooltip');
let itemIcons = document.querySelectorAll('.item__icon');
let numberOfItems = itemIcons.length;

for (let i = 0; i < numberOfItems; ++i) {
    itemIcons[i].onmouseover = () => iconTooltips[i].style.display = "block";
    itemIcons[i].onmouseout = () => iconTooltips[i].style.display = "none";
}
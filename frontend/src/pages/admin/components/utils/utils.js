// CreateProductPageComponent and EditProductPageComponent will both use the following code: 

export const changeCategory = (e, categories, setAttributesFromDb, setCategoryChosen) => {
    const highLevelCategory = e.target.value.split("/")[0];
    const highLevelCategoryAllData = categories.find((cat) => cat.name ===
        highLevelCategory);
    if (highLevelCategoryAllData && highLevelCategoryAllData.attrs) {
        setAttributesFromDb(highLevelCategoryAllData.attrs);
    } else {
        setAttributesFromDb([]);
    }
    setCategoryChosen(e.target.value);
}

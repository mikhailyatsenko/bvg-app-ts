export const StopSearch = () => {
  return (
    <div className="search-form">
      <input
        className={
          "search-form__input" + (selectedStop && " search-form__input--small")
        }
        type="text"
        value={searchInputValue}
        placeholder="type stop name here..."
        ref={inputRef}
        onChange={(event) => {
          updateSearchInput(event.target.value);
        }}
      />
    </div>
  );
};

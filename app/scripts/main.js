var ko = window.ko;

function AppViewModel() {
    this.currentPage = ko.observable('main');

    this.currentQuestion = ko.observable();
    this.questions = ko.observableArray();
}

window.m_site = new AppViewModel();
ko.applyBindings(window.m_site);

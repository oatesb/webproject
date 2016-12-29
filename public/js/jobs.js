$(document).ready(function () {

    $.getJSON('/jobs-api', printJobs);

    $('form').submit(function (e) {
        e.preventDefault();

        //post sample if you wanted to have a form to add a new project.
        $.post('/jobs-api', { project_id: $('#project_id').val(), project_name: $('#project_name').val() }, printJobs);
        this.reset();
    });

});

function printJobs(jobs) {
    $('#jobTableBody').empty();
    $.each(jobs, function () {

        $('#jobTableBody')
            .append($('<tr>')
                .append($('<td><a href="projects/' + this.project_id + '">' + this.project_name + '</a></td>'))
                .append($('<td>')
                    .text(this.user_id))
                .append($('<td>')
                    .text(this.status))
                .append($('<td>')
                    .text(JSON.stringify(this.context_info)))
        );
    });
}



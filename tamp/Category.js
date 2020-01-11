<div class="list-group">
    <a href="/tin-tuc" class="list-group-item list-group-item-action border rounded-0"><span>Bài Viết Mới</span></a>
    <% hashtags.forEach(hashtag => {%>
    <a href="/tin-tuc?category=<%=hashtag.name%>"
        class="list-group-item list-group-item-action border rounded-0"><span><%=hashtag.name%></span></a>
    <%})
        %>

</div>
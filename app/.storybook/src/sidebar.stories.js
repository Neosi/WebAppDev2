import React from 'react';
import { Button } from '@storybook/react/demo';

export default { title: 'Sidebar' };

export const Sidebar = (props) => (
<table border="4" cellpadding="2" cellspacing="2" width="100%">
    <tr> 
        <td>Character</td>
    </tr>
</table>
);

export const SidebarItem = () => (
    <Button><span role="img" aria-label="so cool">😀 😎 👍 💯</span></Button>
);
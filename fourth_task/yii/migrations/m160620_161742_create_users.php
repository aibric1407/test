<?php

use yii\db\Migration;

/**
 * Handles the creation for table `users`.
 */
class m160620_161742_create_users extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable('users', [
            'id' => $this->primaryKey(),
        	'name' => $this->text(),
        	'username' => $this->text(),
        	'email' => $this->text(),
        	'password' => $this->text(),
        	
        ]);
    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        $this->dropTable('users');
    }
}
